import { io, Socket } from 'socket.io-client';
import { getAuthTokenFromCookies } from './authUtils';

interface SocketClientOptions {
  namespacePath: string;
  extraQueryParams?: Record<string, string>;
  userId?: string;
}

// Define event callback types
type ConnectionStatusCallback = (isConnected: boolean) => void;
type ErrorCallback = (error: Error | null) => void;

/**
 * Socket.IO client wrapper with auth, reconnection and namespacing support
 */
class SocketClient {
  private socket: Socket | null = null;
  private connectPromise: Promise<void> | null = null;
  private namespacePath: string;
  private extraQueryParams: Record<string, string>;
  private userId?: string;
  private eventListeners: Array<{ event: string; handler: (...args: unknown[]) => void }> = [];
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = Infinity;
  private reconnectDelay: number = 1000;
  private maxReconnectDelay: number = 5000;
  
  // Connection status callbacks
  private connectionStatusCallbacks: ConnectionStatusCallback[] = [];
  private errorCallback: ErrorCallback[] = [];

  constructor(options: SocketClientOptions) {
    this.namespacePath = options.namespacePath;
    this.extraQueryParams = options.extraQueryParams || {};
    this.userId = options.userId;
  }

  /**
   * Builds the socket endpoint URL
   */
  private buildSocketUrl(): string {
    const base = process.env.NEXT_PUBLIC_LISTINGS_BASE_URL;
    
    if (!base) {
      throw new Error('NEXT_PUBLIC_LISTINGS_BASE_URL is not defined in environment variables');
    }

    const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
    
    // Handle root namespace specifically
    if (this.namespacePath === '/') {
      return cleanBase;
    }
    
    const path = this.namespacePath.startsWith('/') 
      ? this.namespacePath 
      : `/${this.namespacePath}`;

    return `${cleanBase}${path}`;
  }

  /**
   * Connect to the backend socket server
   */
  public async connect(): Promise<void> {
    // If already connected, return immediately
    if (this.socket?.connected) {
      return Promise.resolve();
    }

    // If connection is in progress, return the existing promise
    if (this.connectPromise) {
      return this.connectPromise;
    }

    // Create a new connection promise
    this.connectPromise = new Promise<void>(async (resolve, reject) => {
      try {
        // Build query parameters
        const query: Record<string, string> = { ...this.extraQueryParams };

        // Add userId to query parameters if provided
        if (this.userId) {
          query.userId = this.userId;
        }

        const url = this.buildSocketUrl();

        console.log('SocketClient: connecting to', url, 'with query params:', query);

        // Get auth token
        const token = getAuthTokenFromCookies();

        // Create socket connection with auth
        this.socket = io(url, {
          transports: ['websocket'],
          reconnection: true,
          reconnectionAttempts: this.maxReconnectAttempts,
          reconnectionDelay: this.reconnectDelay,
          reconnectionDelayMax: this.maxReconnectDelay,
          timeout: 15000,
          query,
          auth: token ? { token } : undefined,
          extraHeaders: token
            ? {
                Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
              }
            : undefined,
        });

        // Set up event listeners
        const connectHandler = () => {
          console.log('SocketClient: connected to', url, 'with userId:', this.userId);
          this.reconnectAttempts = 0; // Reset reconnect attempts on successful connection
          this.notifyConnectionStatus(true);
          resolve();
        };

        const connectErrorHandler = (error: Error) => {
          console.error('SocketClient: connect_error =>', error);
          this.reconnectAttempts++;
          
          // Check if we've exceeded max reconnect attempts
          if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            const errorMsg = `Failed to connect after ${this.maxReconnectAttempts} attempts`;
            this.notifyError(new Error(errorMsg));
            reject(new Error(errorMsg));
            return;
          }
          
          this.notifyError(error);
          reject(error);
        };

        const errorHandler = (error: Error) => {
          console.error('SocketClient: error =>', error);
          this.notifyError(error);
          reject(error);
        };

        const disconnectHandler = (reason: string) => {
          console.log('SocketClient: disconnected due to', reason);
          this.notifyConnectionStatus(false);
          // Reset connection promise to allow reconnecting
          this.connectPromise = null;
          
          // Only attempt to reconnect if it was not manually disconnected
          if (reason !== 'io client disconnect' && reason !== 'io server disconnect') {
            // Implement exponential backoff for reconnections
            const delay = Math.min(this.reconnectDelay * Math.pow(2, this.reconnectAttempts), this.maxReconnectDelay);
            console.log(`SocketClient: reconnecting in ${delay}ms (attempt ${this.reconnectAttempts + 1})`);
            
            setTimeout(() => {
              if (this.socket && !this.socket.connected) {
                this.socket.connect();
              }
            }, delay);
          }
        };

        this.socket.on('connect', connectHandler);
        this.socket.on('connect_error', connectErrorHandler);
        this.socket.on('error', errorHandler);
        this.socket.on('disconnect', disconnectHandler);

        // Store event listeners for cleanup
        this.eventListeners.push(
          { event: 'connect', handler: connectHandler as (...args: unknown[]) => void },
          { event: 'connect_error', handler: connectErrorHandler as (...args: unknown[]) => void },
          { event: 'error', handler: errorHandler as (...args: unknown[]) => void },
          { event: 'disconnect', handler: disconnectHandler as (...args: unknown[]) => void }
        );

        // Initiate connection
        this.socket.connect();
      } catch (error) {
        console.error('SocketClient: failed to connect =>', error);
        this.connectPromise = null; // Reset promise on error
        this.notifyError(error instanceof Error ? error : new Error('Connection failed'));
        reject(error);
      }
    });

    return this.connectPromise;
  }

  /**
   * Check if the socket is currently connected
   */
  public get isConnected(): boolean {
    return !!this.socket?.connected;
  }

  /**
   * Subscribe to an event stream
   */
  public on<T = unknown>(event: string, handler: (data: T) => void): void {
    if (!this.socket) {
      console.warn('SocketClient: Cannot register event listener, socket not initialized');
      return;
    }
    
    this.socket.on(event, handler);
    this.eventListeners.push({ event, handler: handler as (...args: unknown[]) => void });
  }

  /**
   * Emit an event with data
   */
  public emit(event: string, data?: unknown): void {
    if (!this.socket) {
      console.warn('SocketClient: Cannot emit event, socket not initialized');
      return;
    }
    
    if (!this.socket.connected) {
      console.warn('SocketClient: Cannot emit event, socket not connected');
      // Optionally queue the event for when the socket reconnects
      return;
    }
    
    this.socket.emit(event, data);
  }

  /**
   * Remove a specific event listener
   */
  public off(event: string, handler?: (...args: unknown[]) => void): void {
    if (!this.socket) {
      console.warn('SocketClient: Cannot remove event listener, socket not initialized');
      return;
    }
    
    this.socket.off(event, handler);
    
    // Remove from our stored event listeners
    if (handler) {
      this.eventListeners = this.eventListeners.filter(
        listener => !(listener.event === event && listener.handler === handler)
      );
    } else {
      // Remove all listeners for this event
      this.eventListeners = this.eventListeners.filter(
        listener => listener.event !== event
      );
    }
  }

  /**
   * Disconnect and dispose the socket
   */
  public disconnect(): void {
    if (this.socket) {
      // Remove all event listeners
      this.eventListeners.forEach(({ event, handler }) => {
        this.socket?.off(event, handler);
      });
      this.eventListeners = [];
      
      this.socket.disconnect();
      this.socket = null;
    }
    this.connectPromise = null;
    this.reconnectAttempts = 0;
    this.notifyConnectionStatus(false);
  }

  /**
   * Configure reconnection parameters
   */
  public configureReconnection(maxAttempts: number = Infinity, delay: number = 1000, maxDelay: number = 5000): void {
    this.maxReconnectAttempts = maxAttempts;
    this.reconnectDelay = delay;
    this.maxReconnectDelay = maxDelay;
  }

  /**
   * Subscribe to connection status changes
   */
  public onConnectionStatus(callback: ConnectionStatusCallback): void {
    this.connectionStatusCallbacks.push(callback);
  }

  /**
   * Subscribe to error events
   */
  public onError(callback: ErrorCallback): void {
    this.errorCallback.push(callback);
  }

  /**
   * Unsubscribe from connection status changes
   */
  public offConnectionStatus(callback: ConnectionStatusCallback): void {
    this.connectionStatusCallbacks = this.connectionStatusCallbacks.filter(cb => cb !== callback);
  }

  /**
   * Unsubscribe from error events
   */
  public offError(callback: ErrorCallback): void {
    this.errorCallback = this.errorCallback.filter(cb => cb !== callback);
  }

  /**
   * Notify all connection status subscribers
   */
  private notifyConnectionStatus(isConnected: boolean): void {
    this.connectionStatusCallbacks.forEach(callback => callback(isConnected));
  }

  /**
   * Notify all error subscribers
   */
  private notifyError(error: Error | null): void {
    this.errorCallback.forEach(callback => callback(error));
  }
}

export default SocketClient;