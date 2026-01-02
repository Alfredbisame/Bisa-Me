export interface Message {
  id: string;
  avatar?: string;
  avatarIcon?: string;
  avatarColor: string;
  avatarImage?: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  isRead: boolean | string;
  status: "active" | "closed" | boolean;
  adTitle?: string;
  imageUrl?: string;
  listingId?: string;
  phoneNumber?: string;
  mainId?: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
  type: "text" | "image" | "file";
  status?: "sending" | "failed" | "sent" | "delivered" | "read";
}

export interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
}
