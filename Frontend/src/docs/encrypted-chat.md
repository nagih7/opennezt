# Encrypted Chat Feature

This implementation adds end-to-end encrypted chat functionality to the OpenNezt application using the Signal Protocol.

## Components

### Main Components

1. **SignalService**
   - Core service that handles cryptographic operations
   - Manages keys and session establishment
   - Located at `src/services/SignalService/index.js`

2. **EncryptedChatService**
   - Higher-level service for integrating Signal Protocol with the chat functionality
   - Located at `src/services/EncryptedChatService.js`

3. **useEncryptedChat Hook**
   - Custom React hook for easy integration with components
   - Handles loading, decrypting, and sending encrypted messages
   - Located at `src/hooks/useEncryptedChat.js`

4. **SignalContext**
   - React context for global access to Signal Protocol state
   - Located at `src/context/SignalContext/index.js`

### UI Components

1. **EncryptedChat**
   - Basic chat UI component that handles encrypted messages
   - Located at `src/components/chat/EncryptedChat.js`

2. **ChatWithEncryption**
   - Wrapper component that handles encryption initialization
   - Located at `src/components/chat/ChatWithEncryption.js`

3. **EncryptionToggle**
   - Toggle component for enabling/disabling encryption
   - Located at `src/components/chat/EncryptionToggle.js`

4. **ConversationWithEncryption**
   - Full conversation component with encryption capabilities
   - Located at `src/components/chat/ConversationWithEncryption.js`

## How to Use

### Basic Usage

1. Import and use the `ConversationWithEncryption` component in your routes:

```jsx
import ConversationWithEncryption from '@/components/chat/ConversationWithEncryption';

// In your route configuration
{
  path: '/chat/:conversationId',
  element: <ConversationWithEncryption />
}
```

2. For manual integration, use the hooks directly:

```jsx
import useEncryptedChat from '@/hooks/useEncryptedChat';

const MyComponent = ({ conversationId, otherUserId }) => {
  const { 
    messages, 
    sendMessage, 
    isLoading, 
    error 
  } = useEncryptedChat(conversationId, otherUserId);
  
  // Use these values in your component
};
```

### Advanced Usage

1. Add the Signal Provider to your app:

```jsx
import { SignalProvider } from '@/context/SignalContext';

// In your root component
<SignalProvider>
  <App />
</SignalProvider>
```

2. Use the Signal Context in components:

```jsx
import { useSignal } from '@/context/SignalContext';

const MyComponent = () => {
  const { 
    initialized, 
    establishSession, 
    hasSession 
  } = useSignal();
  
  // Use these values in your component
};
```

## Key Points

1. **Encryption is per conversation**
   - Each conversation can have encryption enabled/disabled independently
   - Backend field `encryption_enabled` controls this feature

2. **Keys are managed automatically**
   - Identity keys are generated once
   - Pre-keys are rotated periodically

3. **Messages are decrypted on the client side**
   - Server never sees decrypted content
   - Encrypted messages are stored in encrypted form
