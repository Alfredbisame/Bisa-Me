import React from "react";
import TextInput from "../../Books/components/TextInput";

interface TitleProps {
  title: string;
  placeholder: string;
  formTitle: string;
  handleNameChange: (name: string, value: string) => void;
}

const Title: React.FC<TitleProps> = ({
  title,
  placeholder,
  formTitle,
  handleNameChange,
}) => {
  return (
    <TextInput
      title={title}
      inputName="title"
      value={formTitle}
      handleNameChange={handleNameChange}
      placeholder={placeholder}
    />
  );
};

export default Title;
