import React from "react";

interface CustomizePromptProps {
  icon?: React.ReactNode;
  backgroundColor: string;
  message: string;
  textColor: string;
}

const CustomizePrompt: React.FC<CustomizePromptProps> = ({
  icon,
  message,
  backgroundColor,
  textColor,
}) => {
  return (
    <div
      className={`my-3 md:my-5 flex gap-2 border border-${backgroundColor}-200 rounded-xl bg-${backgroundColor}-100 p-2 items-center `}
    >
      <span>{icon}</span>
      <p
        className={`text-xs  text-${textColor}-500 font-semibold text-center `}
      >
        {message}
      </p>
    </div>
  );
};

export default CustomizePrompt;
