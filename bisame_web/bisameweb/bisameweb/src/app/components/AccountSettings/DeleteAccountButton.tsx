"use client";
import { CiTrash } from "react-icons/ci";
import useDeleteAccount from "./hooks/useDeleteAccount";

const DeleteAccountButton: React.FC = () => {
  const { handleDeleteAccount } = useDeleteAccount();

  const handleDelete = () => {
    handleDeleteAccount();
  };

  return (
    <div className="flex justify-end mt-6">
      <button
        className="text-xs font-bold uppercase text-red-600 border border-red-600 rounded px-4 py-2 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400 flex items-center space-x-2 transition-colors duration-200 cursor-pointer"
        type="button"
        onClick={handleDelete}
      >
        <CiTrash className="text-sm" />
        <span>Delete Account</span>
      </button>
    </div>
  );
};

export default DeleteAccountButton;
