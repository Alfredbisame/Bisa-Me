"use client";
import React, { createContext, useContext, useState } from "react";

interface PostContextProps {
  // properties and method for modal
  isOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;

  // properties and method for edit
  editProductId: string | null;
  handleEditProductId: (id: string | null) => void;
}

const PostContext = createContext<PostContextProps | null>(null);

const PostContextProvider = ({ children }: { children: React.ReactNode }) => {
  // Modal state handler
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Edit state
  const [editProductId, setEditProductId] = useState<string | null>(null);

  // Logic to handle modal updates
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  // Logic for setting editProductId
  const handleEditProductId = (id: string | null) => {
    setEditProductId(id);
  };

  return (
    <PostContext.Provider
      value={{
        // modal props and methods
        isOpen,
        handleOpenModal,
        handleCloseModal,
        // edit prop and method
        editProductId,
        handleEditProductId,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error(
      "Forgot to wrap component with Provider. Do the necessary action"
    );
  }

  return context;
};

export default PostContextProvider;
