import React from "react";
import { replyEquivalence } from "./utils";

interface QuickRepliesProps {
  onQuickReply: (reply: string) => void;
}

const quickReplies = [
  "Last price",
  "Ask for location",
  "Make an offer",
  "Please call",
  "Let's schedule a meeting",
];


const QuickReplies: React.FC<QuickRepliesProps> = ({ onQuickReply }) => {
  return (
    <div className="flex flex-wrap gap-1">
      {quickReplies.map((reply) => (
        <button
          key={reply}
          onClick={() => onQuickReply(replyEquivalence(reply))}
          className="border border-blue-200 text-blue-600 rounded-full px-2 py-1 text-xs font-medium hover:bg-blue-50 hover:border-blue-300 transition-colors whitespace-nowrap"
        >
          {reply}
        </button>
      ))}
    </div>
  );
};

export default QuickReplies;
