"use client";
import React from "react";
import { RiCloseFill } from "react-icons/ri";

interface CloseIconProps {
  handleShowFilter: () => void;
}
const CloseIcon: React.FC<CloseIconProps> = ({ handleShowFilter }) => {
  return (
    <span className="flex items-center justify-end">
      <RiCloseFill
        size={25}
        className="md:hidden m-3"
        onClick={handleShowFilter}
      />
    </span>
  );
};

export default CloseIcon;
