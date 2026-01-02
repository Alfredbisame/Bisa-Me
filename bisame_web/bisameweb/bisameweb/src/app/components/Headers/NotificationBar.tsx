"use client";

import { motion } from "framer-motion";

interface NotificationBarProps {
  messages?: string[];
  speed?: number;
}

const NotificationBar = ({ messages, speed = 50 }: NotificationBarProps) => {
  // Default dummy messages if none provided
  const defaultMessages = [
    "✨ Free promotion!!! List Free on top marketplace deals",
    "🎉 Free promotion!!! List Free on trending",
    "🎉 Free promotion!!! List Free on Explore local services",
    "🎉 Free promotion!!! List Free on featured posts",
    "🌟 Free promotion!!! List Free on top marketplace deals",
    "🎯 Free promotion!!! List Free on trending",
    "✨ Free promotion!!! List Free on Explore local services",
    "🌟 Free promotion!!! List Free on featured posts",
  ];

  const displayMessages =
    messages && messages.length > 0 ? messages : defaultMessages;

  // Duplicate messages for seamless loop
  const scrollingText = [...displayMessages, ...displayMessages].join(" • ");

  return (
    <div className="relative bg-orange-500 text-white overflow-hidden">
      <div className="relative flex items-center p-3 md:p-4">
        {/* Scrolling text container with gradient mask */}
        <div
          className="flex-1 overflow-hidden relative"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          }}
        >
          <motion.div
            className="whitespace-nowrap inline-block"
            animate={{
              x: [0, "-50%"],
            }}
            transition={{
              duration: speed,
              repeat: Infinity,
              ease: "linear",
            }}
            whileHover={{
              animationPlayState: "paused",
            }}
          >
            <span className="text-sm md:text-base">
              {scrollingText}
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NotificationBar;
