"use client";
import React, { useCallback } from "react";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import useActivatePosts from "../hooks/use-change-post-status";
import Swal from "sweetalert2";

interface EditCloseButtonProps {
  id: string;
  onEdit: (productId: string) => void;
  onClose: (productId: string) => void;
}

const EditCloseButton: React.FC<EditCloseButtonProps> = ({
  id,
  onEdit,
  onClose,
}) => {
  // Delete hook
  const { data: ActivateData, refresh } = useActivatePosts("Delete");
  // Close logic:

  const handleDeletePost = useCallback(
    async (productId: string) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to close this product listing?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#0634ba",
        confirmButtonText: "Yes, close it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        try {
          Swal.fire({
            title: "Deleting...",
            text: "Please wait while we close your listing.",
            icon: "info",
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

          await refresh(productId);

          await Swal.fire({
            title: "Success!",
            text: `"It has been closed successfully.`,
            icon: "success",
            confirmButtonColor: "#0634ba",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          });

          // Reload the page after success
          window.location.reload();
        } catch (error) {
          // Show error message if something goes wrong
          await Swal.fire({
            title: "Error!",
            text: `Failed to reactivate". Please try again.`,
            icon: "error",
            confirmButtonColor: "#d33",
          });
        }
      }
    },
    [refresh]
  );

  return (
    <div className="flex justify-between items-center mt-3">
      <button
        onClick={() => onEdit(id)}
        className="flex items-center text-blue-600 hover:text-blue-800 text-xs font-medium transition-colors duration-200"
      >
        <FaEdit className="mr-1" size={12} />
        Edit
      </button>
      <button
        onClick={() => handleDeletePost(id)}
        className="flex items-center text-red-600 hover:text-red-800 text-xs font-semibold transition-colors duration-200"
      >
        {/* <FaTimes className="mr-1" size={12} /> */}
        <MdOutlineDelete className="mr-1" size={12} />
        Delete
      </button>
    </div>
  );
};

export default EditCloseButton;
