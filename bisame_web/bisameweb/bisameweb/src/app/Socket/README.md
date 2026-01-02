# Socket Directory Documentation

## Overview

This directory contains the WebSocket client implementation for real-time communication in the Bisame web application. It provides a robust, reusable Socket.IO client wrapper and a React hook for easy integration with functional components.

The implementation handles authentication, automatic reconnection with exponential backoff, namespacing, and proper event management.

## File Structure

```
Socket/
├── SocketClient.ts     # Core Socket.IO client wrapper class
├── authUtils.ts        # Authentication utility functions
├── useSocket.ts        # React hook for socket integration
└── README.md           # This documentation file
```

## Components

### 1. SocketClient.ts

This is the main class that wraps the Socket.IO client library with additional features:

#### Features

- **Authentication Support**: Automatically attaches auth tokens from cookies
- **Namespacing**: Supports connecting to different Socket.IO namespaces
- **Automatic Reconnection**: Implements exponential backoff strategy
- **Event Management**: Proper registration and cleanup of event listeners
- **Connection Status Tracking**: Provides connection status updates
- **Error Handling**: Comprehensive error reporting and handling

#### Key Methods

- `connect()`: Establishes connection to the Socket.IO server
- `disconnect()`: Gracefully closes the connection
- `on(event, handler)`: Registers event listeners
- `emit(event, data)`: Sends events to the server
- `off(event, handler)`: Removes event listeners
- `configureReconnection()`: Configures reconnection parameters

#### Configuration

The client uses the `NEXT_PUBLIC_LISTINGS_BASE_URL` environment variable to determine the Socket.IO server endpoint.

### 2. authUtils.ts

Provides utility functions for extracting authentication tokens from different sources:

#### Functions

- `getAuthTokenFromCookies()`: Extracts auth token from browser cookies
- `getAuthTokenFromHeaders()`: Extracts auth token from HTTP headers (server-side)

Both functions support the standard Bearer token format and cookie-based authentication.

### 3. useSocket.ts

A React hook that provides a convenient way to use the SocketClient in functional components:

#### Usage

```typescript
const { isConnected, error, connect, disconnect, emit, on, off } = useSocket('/chat', userId);
```

#### Return Values

- `isConnected`: Boolean indicating connection status
- `error`: Error object if any error occurred
- `connect()`: Function to initiate connection
- `disconnect()`: Function to close connection
- `emit(event, data)`: Function to send events
- `on(event, handler)`: Function to subscribe to events
- `off(event, handler)`: Function to unsubscribe from events

## Usage Examples

### Basic Usage in a Component

```typescript
import useSocket from './Socket/useSocket';

const ChatComponent = ({ userId }) => {
  const { isConnected, error, emit, on } = useSocket('/chat', userId);

  useEffect(() => {
    // Listen for chat messages
    on('message', (data) => {
      console.log('Received message:', data);
    });

    // Send a message
    if (isConnected) {
      emit('sendMessage', { text: 'Hello World' });
    }
  }, [isConnected]);

  return (
    <div>
      {isConnected ? 'Connected' : 'Disconnected'}
      {error && `Error: ${error.message}`}
    </div>
  );
};
```

### Manual Connection Control

```typescript
const { connect, disconnect, isConnected } = useSocket('/notifications', userId, false);

const handleConnect = () => {
  connect();
};

const handleDisconnect = () => {
  disconnect();
};
```

## Environment Configuration

The Socket client requires the following environment variable:

- `NEXT_PUBLIC_LISTINGS_BASE_URL`: The base URL of the Socket.IO server

## Authentication Flow

1. On connection, the client attempts to extract the auth token from cookies
2. The token is sent as part of the Socket.IO handshake in both the `auth` object and `Authorization` header
3. The server can validate the token to authenticate the connection

## Error Handling

The implementation provides multiple layers of error handling:

- Connection errors
- Authentication errors
- Network errors
- Server-side errors

Errors are propagated through the error callback mechanism and can be handled in components using the hook.

## Reconnection Strategy

The client implements an exponential backoff reconnection strategy:

- Initial reconnection delay: 1 second
- Maximum reconnection delay: 5 seconds
- Delay increases exponentially with each failed attempt
- Configurable maximum reconnection attempts

## Best Practices

1. **Clean Up**: Always unsubscribe from events and disconnect when components unmount
2. **Error Handling**: Implement proper error handling in your components
3. **Connection Management**: Be mindful of when to connect/disconnect to conserve resources
4. **Namespace Usage**: Use appropriate namespaces for different features/services

## Dependencies

- `socket.io-client`: The underlying Socket.IO client library
- React: For the useSocket hook implementation

## Troubleshooting

### Common Issues

1. **Connection Failures**:
   - Verify `NEXT_PUBLIC_LISTINGS_BASE_URL` is correctly set
   - Check network connectivity to the Socket.IO server
   - Ensure the server is running and accepting connections

2. **Authentication Errors**:
   - Verify the auth token is correctly set in cookies
   - Check token expiration
   - Confirm the server is configured to accept the token format

3. **Event Not Received**:
   - Verify event names match between client and server
   - Check that the client is connected when expecting events
   - Ensure event listeners are properly registered

## Extending the Implementation

To add new features:

1. Extend the SocketClient class with additional methods
2. Add new event handlers in the useSocket hook if needed
3. Update authentication utilities for new auth mechanisms
4. Modify reconnection logic for different strategies

## Security Considerations

- Auth tokens are transmitted securely through Socket.IO channels
- Validate all data received from the server
- Sanitize any user-generated content before displaying
- Implement proper authorization checks on the server side
