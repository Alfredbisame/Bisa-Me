# MessageBox Components

This directory contains all components related to the in-app messaging modal, including quick messages, message input, and modal logic for sending messages to users or sellers.

## Directory Structure

```
MessageBox/
├── MessageBoxModal.tsx     # Main modal for composing and sending messages
├── QuickMessagesList.tsx   # List of quick message buttons for fast replies
├── QuickMessageButton.tsx  # Button component for a single quick message
├── MessageInput.tsx        # Textarea input for custom messages
```

## Component Overview

### Core Components

- **MessageBoxModal.tsx**  
  Main modal for composing and sending messages. Handles modal open/close, quick message selection, message input, sending state, and success animation. Accepts props for recipient, product, and send callback.

- **QuickMessagesList.tsx**  
  Horizontally scrollable list of pre-defined quick messages. Allows users to select a message for fast replies. Includes scroll buttons and visual hints.

- **QuickMessageButton.tsx**  
  Button for a single quick message. Supports active/disabled states and visual feedback.

- **MessageInput.tsx**  
  Textarea input for custom messages. Auto-resizes, shows character count, and provides focus/validation feedback.

## Usage Example

```tsx
import MessageBoxModal from './components/MessageBox/MessageBoxModal';

export default function ContactSeller() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Message Seller</button>
      <MessageBoxModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSendMessage={(msg) => {/* send message logic */}}
        recipientName="Seller Name"
        productTitle="Product Title"
      />
    </>
  );
}
```

## Extending & Maintaining

- **Add new quick messages:**  
  Update the `QUICK_MESSAGES` array in `QuickMessagesList.tsx`.
- **Customize modal UI:**  
  Adjust layout, transitions, or add new fields in `MessageBoxModal.tsx`.
- **Change message input behavior:**  
  Update logic in `MessageInput.tsx`.
- **Integrate with backend:**  
  Implement real message sending in the `onSendMessage` callback.

## Best Practices

- **Keep quick messages relevant and concise** for user convenience.
- **Handle loading and error states** gracefully in the modal.
- **Test modal accessibility** (keyboard, screen reader, etc.).
- **Use skeletons or loading indicators** for better UX during async actions.

## Contribution Guidelines

- Follow the existing component and prop patterns.
- Document any new features or changes in this README.
- Test all changes for usability and responsiveness.

--- 