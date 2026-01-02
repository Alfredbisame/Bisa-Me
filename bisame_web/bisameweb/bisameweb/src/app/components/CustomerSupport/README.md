# CustomerSupport Components

This directory contains all components related to the customer support/contact flow, including a WhatsApp-integrated support form and the main support page.

## Directory Structure

```
CustomerSupport/
├── CustomerSupportPage.tsx   # Main page for customer support (form + layout)
├── SupportForm.tsx           # Form component for submitting support requests
```

## Component Overview

### Core Components

- **CustomerSupportPage.tsx**  
  Main page for customer support. Renders a heading, description, and the `SupportForm`. Handles form submission and manages loading state. On submit, it uses a utility (`submitToWhatsApp`) to redirect the user to WhatsApp with their message pre-filled.

- **SupportForm.tsx**  
  Form for collecting user support requests. Includes fields for name, subject, and message. Validates input, shows a loading state, and triggers the provided `onSubmit` callback. Styled for clarity and user-friendliness.

## Support Flow

1. **User fills out the support form** (name, subject, message).
2. **On submit**, the form data is passed to the parent page's handler.
3. The handler calls `submitToWhatsApp` (from `src/app/utils/whatsappUtils.ts`), which:
   - Formats the message.
   - Opens WhatsApp (web or app) in a new tab with the message pre-filled to the support number.
4. **User completes the message/send in WhatsApp.**

## Usage Example

```tsx
import CustomerSupportPage from './components/CustomerSupport/CustomerSupportPage';

export default function Support() {
  return <CustomerSupportPage />;
}
```

## Extending & Maintaining

- **Change WhatsApp number:**  
  Update the `phoneNumber` in `src/app/utils/whatsappUtils.ts`.
- **Add more fields:**  
  Update the `FormData` interface and form logic in both `SupportForm.tsx` and the utility.
- **Customize UI:**  
  Adjust styles and layout in `SupportForm.tsx` and `CustomerSupportPage.tsx` as needed.
- **Add other contact methods:**  
  Extend the form and submission logic to support email, phone, or other channels.

## Best Practices

- **Validate all user input** before submission.
- **Keep the WhatsApp number up to date** and tested.
- **Provide clear user feedback** (loading, errors, success messages).
- **Keep the support flow simple and user-friendly.**

## Contribution Guidelines

- Follow the existing component and form patterns.
- Document any new features or changes in this README.
- Test the WhatsApp integration on both desktop and mobile.

--- 