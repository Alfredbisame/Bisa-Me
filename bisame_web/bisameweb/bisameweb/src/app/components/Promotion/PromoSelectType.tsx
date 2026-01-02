"use client";
import React from "react";
import type { ComponentType } from "react";

interface PromoSelectTypeProps {
  promoTypeHeader: string;
  promoTypeDetail: string;
  icon: ComponentType<{ size?: number; color?: string; className?: string }>;
  name: string;
  labelName: string;
  value: string;
  isChecked: boolean;
  onChange: (checked: boolean) => void;
  styles?: string;
}

const PromoSelectType: React.FC<PromoSelectTypeProps> = ({
  icon: IconComponent,
  promoTypeHeader,
  promoTypeDetail,
  labelName,
  isChecked,
  onChange,
  styles,
}) => {
  return (
    <label htmlFor={labelName} className={styles}>
      <div
        className={`flex border cursor-pointer p-2 rounded-lg items-center justify-between gap-3 ${
          isChecked ? "border-orange-500" : ""
        }`}
      >
        <div className="flex gap-2 items-center">
          <div className="icon bg-orange-500 p-2 flex items-center justify-center rounded-md">
            <IconComponent size={15} color="white" />
          </div>
          <div className="text-xs">
            <h3>{promoTypeHeader}</h3>
            <p className="text-xs text-gray-400">{promoTypeDetail}</p>
          </div>
        </div>

        <input
          type="checkbox"
          id={labelName}
          checked={isChecked}
          onChange={(e) => onChange(e.target.checked)}
          className="accent-orange-500"
        />
      </div>
    </label>
  );
};

export default PromoSelectType;
