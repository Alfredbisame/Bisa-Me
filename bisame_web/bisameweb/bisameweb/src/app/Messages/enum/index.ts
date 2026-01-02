// enum.ts
export enum ChatMessageType {
  Text = "Text",
  Image = "Image",
  Video = "Video",
  File = "File",
  Location = "Location",
  Contact = "Contact",
  Poll = "Poll",
  Reaction = "Reaction",
  System = "System",
  Other = "Other",
}

export enum ChatMessageAttachmentType {
  Image = "Image",
  Video = "Video",
  File = "File",
  Location = "Location",
  Contact = "Contact",
  Poll = "Poll",
  Reaction = "Reaction",
  System = "System",
  Other = "Other",
}

export enum ChatMessageStatus {
  Sent = "Sent",
  Delivered = "Delivered",
  Read = "Read",
  Failed = "Failed",
  Pending = "Pending",
  Cancelled = "Cancelled",
  Archived = "Archived",
  Deleted = "Deleted",
}
