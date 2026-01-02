"use client";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { Product } from "./types";
import { useMyPostData } from "./useMyPostData";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMyPostDataStatus } from "./useMyPostDataStatus";
import EditProductModal from "./EditProductModal";
import { usePostUpdateFetch } from "./usePostUpdateFetch";
import { usePostUpdatePost } from "./usePostUpdatePost";
import { UpdateProductProps } from "./interfaces";
import useActivatePosts from "./hooks/use-change-post-status";
import { useRouter } from "next/navigation";
import ActiveProductCard from "./ActiveProductCard";
import ManagePostError from "./ManagePostError";
import { FiInbox } from "react-icons/fi";

const ActiveProducts = () => {
  // Use the new hook with status filter
  const { data, loading, error } = useMyPostData("Active");
  const activeProducts: Product[] = data?.results || [];

  // Use a single state object to track image sources for all products
  const [imgSrcMap, setImgSrcMap] = useState<Record<string, string>>({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const router = useRouter();

  const {
    data: editingProductData,
    loading: editingProductLoading,
    error: editingProductError,
    triggerEditProduct,
  } = usePostUpdateFetch();
  const { updatePost, result: updateResult } = usePostUpdatePost();

  const {
    changeStatus,
    loading: statusLoading,
    error: statusError,
  } = useMyPostDataStatus();

  const { refresh: refreshClose } = useActivatePosts("Closed");
  const { refresh: refreshDelete } = useActivatePosts("Delete");

  useEffect(() => {
    if (updateResult && updateResult.message) {
      if (updateResult.success) {
        toast.success(updateResult.message);
        setEditModalOpen(false);
      } else {
        toast.error(updateResult.message);
      }
    }
  }, [updateResult]);

  const handleEdit = (productId: string) => {
    setEditModalOpen(true);
    triggerEditProduct({ id: productId });
  };

  const handleUpdateProduct = (reqBody: UpdateProductProps) => {
    updatePost(reqBody);
    // Do not close modal here; wait for updateResult.success
    // setEditModalOpen(false);
    // setEditingProductId(null);
  };

  const handleCancelEdit = () => {
    setEditModalOpen(false);
  };

  const handleClose = useCallback(
    async (productId: string) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to close this product listing?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#0634ba",
        confirmButtonText: "Yes, close",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        try {
          Swal.fire({
            title: "Closing...",
            text: "Please wait while we close your listing.",
            icon: "info",
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

          await refreshClose(productId);

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
    [refreshClose]
  );

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
        <div className="w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 text-sm">Loading your active products...</p>
      </div>
    );
  }

  const handleProductDetail = (productId: string): void => {
    router.push(`/ProductDetails?id=${productId}`);
  };

  if (error) {
    return <ManagePostError error={error} />;
  }

  if (!activeProducts.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="flex items-center justify-center w-28 h-28 rounded-full bg-orange-50 mb-6 shadow-lg">
          <FiInbox className="text-blue-400 opacity-80" size={64} />
        </div>
        <p className="text-gray-600 font-semibold mb-2">No Active Products</p>
        <p className="text-gray-500 text-sm max-w-xs text-center">
          You have no active products at the moment. Start posting to see your
          products here!
        </p>
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

  console.log(editProduct);

  return (
    <>
      <ActiveProductCard
        activeProducts={activeProducts}
        statusLoading={statusLoading}
        onProductDetail={handleProductDetail}
        onClose={handleClose}
        onDeletePost={handleDeletePost}
        onEdit={handleEdit}
        onImageError={handleImageError}
      />

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

      {/* Optionally show error below the grid */}
      {statusError && (
        <div className="text-red-500 text-xs mt-2 text-center">
          {statusError}
        </div>
      )}
    </>
  );
};

export default ActiveProducts;
