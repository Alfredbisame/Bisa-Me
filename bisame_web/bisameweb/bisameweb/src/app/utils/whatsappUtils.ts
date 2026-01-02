interface FormData {
  name: string;
  subject: string;
  message: string;
}

export const submitToWhatsApp = async (formData: FormData): Promise<boolean> => {
  const { name, subject, message } = formData;
  const phoneNumber = '+233256074790';
  
  // Format the message for WhatsApp
  const whatsappMessage = `Hello! I'm ${name}

Subject: ${subject}

Message: ${message}

Thank you!`;

  // Encode the message for URL
  const encodedMessage = encodeURIComponent(whatsappMessage);
  
  // Create WhatsApp URL
  const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodedMessage}`;
  
  // Open WhatsApp in a new window/tab
  window.open(whatsappUrl, '_blank');
  
  return true;
};
