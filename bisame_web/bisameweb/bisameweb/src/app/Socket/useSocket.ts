import { useEffect, useRef, useState } from 'react';
import SocketClient from './SocketClient';

/**
 * React hook for using the SocketClient in functional components
 */
const useSocket = (
  namespacePath: string,
  userId?: string,
  autoConnect: boolean = true
) => {
  const socketRef = useRef<SocketClient | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Initialize the socket client
  useEffect(() => {
    // Create socket client with proper configuration
    socketRef.current = new SocketClient({
      namespacePath,
      userId,
      extraQueryParams: {
        client: 'nextjs',
        platform: 'web'
      }
    });

    // Set up connection status listener
    const handleConnectionStatus = (connected: boolean) => {
      setIsConnected(connected);
    };

    // Set up error listener
    const handleError = (err: Error | null) => {
      setError(err);
    };

    // Attach listeners
    socketRef.current.onConnectionStatus(handleConnectionStatus);
    socketRef.current.onError(handleError);

    // If autoConnect is enabled, connect immediately
    if (autoConnect && socketRef.current) {
      connect();
    }

    // Cleanup function
    return () => {
      if (socketRef.current) {
        socketRef.current.offConnectionStatus(handleConnectionStatus);
        socketRef.current.offError(handleError);
        socketRef.current.disconnect();
      }
    };
  }, [namespacePath, userId, autoConnect]);

  /**
   * Connect to the socket server
   */
  const connect = async () => {
    if (!socketRef.current) return;

    try {
      await socketRef.current.connect();
      // State will be updated through the connection status listener
    } catch (err) {
      // Error will be handled through the error listener
      console.error('useSocket: connection error:', err);
    }
  };

  /**
   * Disconnect from the socket server
   */
  const disconnect = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      // State will be updated through the connection status listener
    }
  };

  /**
   * Emit an event to the server
   */
  const emit = (event: string, data?: unknown) => {
    if (socketRef.current) {
      socketRef.current.emit(event, data);
    }
  };

  /**
   * Listen for events from the server
   */
  const on = <T = unknown>(event: string, handler: (data: T) => void) => {
    if (socketRef.current) {
      socketRef.current.on(event, handler);
    }
  };

  /**
   * Remove event listener
   */
  const off = (event: string, handler?: (...args: unknown[]) => void) => {
    if (socketRef.current) {
      socketRef.current.off(event, handler);
    }
  };

  return {
    isConnected,
    error,
    connect,
    disconnect,
    emit,
    on,
    off
  };
};

export default useSocket;