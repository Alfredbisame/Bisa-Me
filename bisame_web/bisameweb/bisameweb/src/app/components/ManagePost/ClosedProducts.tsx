"use client";
import Image from "next/image";
import { FaMapMarkerAlt, FaRedo, FaTimes } from "react-icons/fa";
import { FiInbox } from "react-icons/fi";
import { Product } from "./types";
import { useMyPostData } from "./useMyPostData";
import { useMyPostDataStatus } from "./useMyPostDataStatus";
import { getImageUrl } from "../ProductDetails/utils/imageUtils";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import useActivatePosts from "./hooks/use-change-post-status";
import { MdOutlineDelete } from "react-icons/md";

const ClosedProducts = () => {
  // Use the new hook with status filter
  const { data, loading, error } = useMyPostData("Closed");
  const closedProducts: Product[] = data?.results || [];

  console.log(closedProducts);
  const {
    changeStatus,
    loading: statusLoading,
    error: statusError,
    result,
  } = useMyPostDataStatus();

  const { refresh } = useActivatePosts("Active");
  const { refresh: refreshDelete } = useActivatePosts("Delete");

  // Use a single state object to track image sources for all products
  const [imgSrcMap, setImgSrcMap] = useState<Record<string, string>>({});

  useEffect(() => {
    if (result && result.message) {
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    }
  }, [result]);

  // Enhanced activation handler with proper async handling and user feedback

  const handleActivate = useCallback(
    async (productId: string, productName: string) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Do you want to reactivate "${productName}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0634ba",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, reactivate!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        try {
          Swal.fire({
            title: "Reactivating...",
            text: "Please wait while we reactivate your listing.",
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
            text: `"${productName}" has been reactivated successfully.`,
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
            text: `Failed to reactivate "${productName}". Please try again.`,
            icon: "error",
            confirmButtonColor: "#d33",
          });
        }
      }
    },
    [refresh]
  );

  // Delete logic
  const handleDeletePost = useCallback(
    async (productId: string) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this product listing?",
        icon: "warning",
        iconColor: "#ff0000",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#0634ba",
        confirmButtonText: "Yes, delete",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        try {
          Swal.fire({
            title: "Deleting...",
            text: "Please wait while we delete your listing.",
            icon: "info",
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

          await refreshDelete(productId);

          await Swal.fire({
            title: "Success!",
            text: `"It has been deleted successfully.`,
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
            text: `Failed to delete". Please try again.`,
            icon: "error",
            confirmButtonColor: "#d33",
          });
        }
      }
    },
    [refreshDelete]
  );

  const handleImageError = (productId: string) => {
    setImgSrcMap((prev) => ({ ...prev, [productId]: "/f4.png" }));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-12 h-12 border-4 border-gray-400 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 text-sm">Loading your closed products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-12 h-12 flex items-center justify-center bg-orange-50 rounded-full mb-4">
          <FaTimes className="text-red-500" size={28} />
        </div>
        <p className="text-red-600 font-semibold mb-2">
          Failed to load products
        </p>
        <p className="text-gray-500 text-sm max-w-xs text-center">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!closedProducts.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-inner">
        <div className="flex items-center justify-center w-28 h-28 rounded-full bg-orange-50 mb-6 shadow-lg">
          <FiInbox className="text-blue-400 opacity-80" size={64} />
        </div>
        <h2 className="md:text-xl font-bold text-gray-700 mb-2">
          No Closed Products
        </h2>
        <p className="text-gray-500 text-sm md:text-base max-w-md text-center mb-4">
          You have no closed products at the moment.
          <br />
          Closed products will appear here for your review.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-6 py-2 text-sm md:text-base bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {closedProducts.map((product) => {
          console.log(product.images[0].imageUrl);
          const imgSrc = product.images[0].imageUrl;
          return (
            <div
              key={product.id}
              className="border p-2 relative transition-all duration-300 hover:bg-gray-100 hover:shadow-md hover:scale-105 cursor-pointer rounded-md opacity-90"
            >
              {/* Status badge */}
              <div className="absolute top-6 right-4 z-10">
                <span className="bg-gray-600 text-white text-xs font-semibold px-2 py-1 rounded-sm shadow">
                  Closed
                </span>
              </div>
              <Image
                src={imgSrc}
                alt={product.name}
                width={150}
                height={150}
                className="w-full h-40 object-cover mt-2 rounded-md transition-transform duration-300 transform"
                onError={() => handleImageError(product.id)}
              />
              <div className="mt-4">
                <h2 className="text-sm text-gray-700 font-semibold mt-2">
                  {product.name}
                </h2>
                <p className="text-gray-500 text-xs line-clamp-2 overflow-hidden text-ellipsis mb-2">
                  {product.description}
                </p>
                <p className="text-gray-500 text-xs mb-2 flex items-center">
                  <FaMapMarkerAlt className="mr-1 text-orange-500" size={12} />
                  {product.location}
                </p>
                <p className="text-orange-500 font-semibold mt-2">
                  {product.price == 0
                    ? "Contact for price"
                    : `GH₵${product?.price}`}
                </p>
                {/* Activate button */}
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleActivate(product.id, product.name)}
                    className="w-1/2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center group"
                    disabled={statusLoading}
                  >
                    <FaRedo className="mr-2 text-xs group-hover:rotate-180 transition-transform duration-300" />
                    {statusLoading ? "Reactivating..." : "Reactivate"}
                  </button>
                  <button
                    className="w-1/2 bg-red-700 rounded-md text-white text-sm flex items-center justify-center gap-2"
                    onClick={() => handleDeletePost(product.id)}
                  >
                    <MdOutlineDelete className="" size={15} />
                    Delete
                  </button>
                </div>
                {/* Status indicator */}
                <div className="mt-2 text-center">
                  <span className="text-xs text-gray-500 italic">
                    Click to make this listing active again
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Optionally show error below the grid */}
      {statusError && (
        <div className="text-red-500 text-xs mt-2 text-center">
          {statusError}
        </div>
      )}
    </>
  );
};

export default ClosedProducts;
