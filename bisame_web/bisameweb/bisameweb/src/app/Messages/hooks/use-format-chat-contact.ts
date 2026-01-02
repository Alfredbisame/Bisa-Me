import { ConversationProps } from "../interfaces";
import { Message } from "../types";

const useFormatChatContact = (
  chatContacts: ConversationProps[] = [],
  mainId: string
): Message[] => {
  const formatChatContact = chatContacts.map<Message>(
    ({
      userId,
      userInfo,
      lastMessage,
      isClosed,
      listingInfo,
      listingId,
      lastConnectionAt,
    }) => ({
      id: userId,
      avatarImage: userInfo.profilePicture,
      avatarColor: "gray",
      isRead: lastMessage.messageStatus,
      lastMessage: lastMessage.message,
      status: isClosed,
      title: `${userInfo.firstName} ${userInfo.lastName}`,
      timestamp: lastConnectionAt,
      adTitle: listingInfo.title,
      imageUrl: listingInfo.imageUrl,
      listingId: listingId,
      phoneNumber: userInfo.phoneNumber,
      mainId: mainId,
    })
  );
  return formatChatContact;
};

export default useFormatChatContact;
