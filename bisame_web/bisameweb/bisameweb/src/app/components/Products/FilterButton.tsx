"use client";
import React from "react";

interface FilterButtonProps {
  label: string;
  styles: string;
  action?: () => void;
  icon?: React.ReactNode;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  styles,
  action,
  icon,
}) => {
  return (
    <button className={styles} onClick={action}>
      {label}
      {icon}
    </button>
  );
};

export default FilterButton;
