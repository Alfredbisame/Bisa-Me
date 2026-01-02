"use client";
import Image from "next/image";
import { FaEdit, FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import { FiInbox } from "react-icons/fi";
import { Product } from "./types";
import { useMyPostData } from "./useMyPostData";
import { getImageUrl } from "../ProductDetails/utils/imageUtils";
import { getFirstImageUrl } from "./utils/imageHelper";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import EditProductModal from "./EditProductModal";
import { usePostUpdateFetch } from "./usePostUpdateFetch";
import { usePostUpdatePost } from "./usePostUpdatePost";
import { useMyPostDataStatus } from "./useMyPostDataStatus";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const UpdateProducts = () => {
  const { data, loading, error } = useMyPostData("Update");
  const updateProducts: Product[] = data?.results || [];

  const [imgSrcMap, setImgSrcMap] = useState<Record<string, string>>({});

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const {
    data: editingProductData,
    loading: editingProductLoading,
    error: editingProductError,
  } = usePostUpdateFetch();
  const { updatePost, result: updateResult } = usePostUpdatePost();
  const {
    changeStatus,
    loading: statusLoading,
    error: statusError,
  } = useMyPostDataStatus();

  useEffect(() => {
    if (updateResult && updateResult.message) {
      if (updateResult.success) {
        toast.success(updateResult.message);
        setEditModalOpen(false);
        setEditingProductId(null);
      } else {
        toast.error(updateResult.message);
      }
    }
  }, [updateResult]);

  const handleEdit = (productId: string) => {
    setEditingProductId(productId);
    setEditModalOpen(true);
  };
  const handleUpdateProduct = (reqBody: {
    id: string;
    title: string;
    description: string;
    price: number;
    location: string;
    category: string;
    subCategory: string;
    childCategory: string | null;
    contactNumber: string;
    images: Array<{ imageUrl: string; id: string }>;
    isPromoted: boolean;
    negotiable: boolean;
    attributes: {
      [key: string]: unknown;
    };
  }) => {
    updatePost(reqBody);
  };
  const handleCancelEdit = () => {
    setEditModalOpen(false);
    setEditingProductId(null);
  };
  const handleClose = async (productId: string) => {
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
      changeStatus(productId, "Closed");
    }
  };

  const handleImageError = (productId: string) => {
    setImgSrcMap((prev) => ({ ...prev, [productId]: "/f4.png" }));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-12 h-12 border-4 border-gray-400 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 text-sm">
          Loading your products to update...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-12 h-12 flex items-center justify-center bg-red-100 rounded-full mb-4">
          <FaTimes className="text-red-500" size={28} />
        </div>
        <p className="text-red-600 font-semibold mb-2">
          Failed to load products
        </p>
        <p className="text-gray-500 text-sm max-w-xs text-center">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!updateProducts.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-inner">
        <div className="flex items-center justify-center w-28 h-28 rounded-full bg-orange-50 mb-6 shadow-lg">
          <FiInbox className="text-blue-400 opacity-80" size={64} />
        </div>
        <h2 className="md:text-xl font-bold text-gray-700 mb-2">
          No Updated Products
        </h2>
        <p className="text-gray-500 text-sm md:text-base max-w-md text-center mb-4">
          You have no recent products updates.
          <br />
          Recently updated products will appear here.
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

  const editProduct = editingProductData
    ? ({
        id: editingProductData.id || editingProductData._id || "",
        name: editingProductData.title || "",
        // Product expects `image`, not `images`
        // and EditProductModal can handle string | string[]
        image:
          editingProductData.images && Array.isArray(editingProductData.images)
            ? editingProductData.images
                .map((img: { imageUrl?: string }) => img.imageUrl || "")
                .filter(Boolean) // remove empty strings
            : typeof editingProductData.images === "string"
            ? editingProductData.images
            : "",
        description: editingProductData.description || "",
        location: editingProductData.location || "",
        price: editingProductData.price?.toString() || "",
      } as Product)
    : null;

  return (
    <>
      <EditProductModal
        id={editProduct?.id as string}
        isOpen={editModalOpen}
        product={editProduct}
        postUpdateInfo={editingProductData}
        loading={editingProductLoading}
        error={editingProductError}
        onUpdate={handleUpdateProduct}
        onCancel={handleCancelEdit}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {updateProducts.map((product) => {
          const imgSrc =
            imgSrcMap[product.id] ||
            getImageUrl(getFirstImageUrl(product.image as string));
          return (
            <div
              key={product.id}
              className="border p-2 relative transition-all duration-300 hover:bg-gray-100 hover:shadow-md hover:scale-105 cursor-pointer rounded-md"
            >
              {/* Status badge */}
              <div className="absolute top-6 right-4 z-10">
                <span className="bg-gray-500 text-white text-xs font-semibold px-2 py-1 rounded-sm shadow">
                  Update
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
                    : `₵${product?.price}`}{" "}
                  ₵{product.price}
                </p>
                {/* Edit and Close buttons */}
                <div className="flex justify-between items-center mt-3">
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="flex items-center text-blue-600 hover:text-blue-800 text-xs font-medium transition-colors duration-200"
                  >
                    <FaEdit className="mr-1" size={12} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleClose(product.id)}
                    className="flex items-center text-red-600 hover:text-red-800 text-xs font-medium transition-colors duration-200"
                    disabled={statusLoading}
                  >
                    <FaTimes className="mr-1" size={12} />
                    {statusLoading ? "Closing..." : "Close"}
                  </button>
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

export default UpdateProducts;
