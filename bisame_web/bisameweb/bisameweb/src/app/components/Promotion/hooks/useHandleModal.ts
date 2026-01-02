import { useState } from "react";

const useHandleModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleChangeModalStatus = () => {
    setIsModalOpen((prev) => !prev);
  };

  return {
    handleChangeModalStatus,
    isModalOpen,
  };
};

export default useHandleModal;
