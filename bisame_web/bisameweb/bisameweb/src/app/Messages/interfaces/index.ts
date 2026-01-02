// interfaces.ts
import {
  ChatMessageAttachmentType,
  ChatMessageStatus,
  ChatMessageType,
} from "../enum";

export interface ConversationProps {
  id: string;
  createdAt: string;
  updatedAt: string;

  isClosed: boolean;
  isConnected: boolean;

  lastConnectionAt: Date;

  lastMessage: LastMessage;

  listingId: string;
  listingInfo: ListingInfo;

  userId: string;
  userInfo: UserInfo;
}

export interface LastMessage {
  createdAt: string;
  messageAttachmentUrl: string;
  message: string;
  messageAttachmentType: "Other" | "Image" | "Video" | "Document" | string;
  messageStatus: "Read" | "Unread" | string;
  messageType: "Text" | "Image" | "Video" | "Document" | string;
}

export interface ListingInfo {
  title: string;
  category: string;
  subCategory: string;
  region: string;
  imageUrl: string;
  childCategory: string;
  [key: string]: unknown;
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  profilePicture: string;
  [key: string]: unknown;
}

export interface MessageData {
  data: {
    results: MessageRecord[];
  };
}

export interface MessageRecord {
  _id: string;
  id: string;
  messageId: string;

  listingId: string;
  listingUserId: string;

  fromUserId: string;
  toUserId: string;

  message: string;
  messageType: "Text" | "Image" | "Other" | string; // add more if needed
  messageStatus: "Read" | "Unread" | string; // add more if needed

  attachmentType: "Other" | "Image" | "File" | string;
  attachmentUrl: string;

  createdAt: string; // ISO date string
  updatedAt: string | null;

  createdBy: string | null;
  updatedBy: string | null;

  __v: number;
}

export interface ChildrenProps {
  children: React.ReactNode;
}

export type ServerChatMessage = {
  id: string; // Server-generated DB id
  createdAt?: Date;
  updatedAt?: Date;
  message: string;
  messageType: ChatMessageType;
  listingId: string;
  listingUserId?: string;
  fromUserId: string;
  toUserId: string;
  attachmentUrl?: string;
  attachmentType?: ChatMessageAttachmentType;
  messageId: string; // Client-generated correlation id
  messageStatus: ChatMessageStatus;
  isOwn?: boolean; // UI-only property
};

export type ChatMessageRequest = Omit<
  ServerChatMessage,
  "id" | "createdAt" | "updatedAt" | "listingUserId" | "messageStatus"
>;

export interface MessagesProps {
  initialContext?: {
    productTitle?: string;
    userId?: string;
    userName?: string;
  };
}

export type ChatsPayload = {
  userId1?: string;
  userId2?: string;
  listingId?: string;
};

export interface InitialContext {
  productTitle?: string;
  userId?: string;
  userName?: string;
}

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

export type UIChatMessageStatus = "sent" | "delivered" | "read";

export interface APIChatMessage {
  messageId: string;
  fromUserId: string;
  toUserId: string;
  listingId: string;
  message: string;
  messageType: string;
  createdAt: string;
  messageStatus?: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
  type: "text" | "image" | "file";
  status?: "sent" | "delivered" | "read";

  listingId?: string;
  messageId?: string;
  fromUserId?: string;
  toUserId?: string;
  createdAt?: Date;
  messageStatus?: string;
}

export interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
}


export interface ChildrenProps {
  children: React.ReactNode;
}


