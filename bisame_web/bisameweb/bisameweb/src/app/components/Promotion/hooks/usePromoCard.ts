"use client";
import { useState } from "react";

const usePromoCard = () => {
  const [isOpenFullList, setIsOpenFullList] = useState<boolean>(false);
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
  const [activeDuration, setActiveDuration] = useState("15 days");

  const handleOpenDropdown = () => {
    setIsOpenDropdown((prev) => !prev);
  };

  const handleOpenFullList = () => {
    setIsOpenFullList((prev) => !prev);
  };

  const handleChangeDuration = (duration: string) => {
    setActiveDuration(duration);
  };

  return {
    isOpenDropdown,
    isOpenFullList,
    activeDuration,
    handleOpenDropdown,
    handleChangeDuration,
    handleOpenFullList,
  };
};

export default usePromoCard;
