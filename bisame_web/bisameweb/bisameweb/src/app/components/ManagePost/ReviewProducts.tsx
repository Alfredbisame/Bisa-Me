"use client";
import { useMyPostData } from "./useMyPostData";
import { getImageUrl } from "../ProductDetails/utils/imageUtils";
import { getFirstImageUrl } from "./utils/imageHelper";
import { useCallback, useState } from "react";
import ErrorPage from "./components/ErrorPage";
import NoProductFound from "./components/NoProductFound";
import LoadingPage from "./components/LoadingPage";
import PostCard from "./components/PostCard";
import CardContainer from "./components/CardContainer";
import { usePostContext } from "./context/PostContext";
import { Product } from "./types";
import Swal from "sweetalert2";
import useActivatePosts from "./hooks/use-change-post-status";

const ReviewProducts = () => {
  const { data, loading, error } = useMyPostData("Reviewing");
  const reviewProducts: Product[] = data?.results || [];

  const {
    isOpen,
    editProductId,
    handleOpenModal,
    handleCloseModal,
    handleEditProductId,
  } = usePostContext();

  const [imgSrcMap, setImgSrcMap] = useState<Record<string, string>>({});


  const handleEdit = (productId: string) => {
    handleOpenModal();
    handleEditProductId(productId);
  };

  const handleClose = (productId: string) => {
    console.log(`Close product with ID: ${productId}`);
    handleCloseModal();
  };

  const handleCancelEdit = () => {
    handleCloseModal();
    handleEditProductId(null);
  };

  const handleImageError = (productId: string) => {
    setImgSrcMap((prev) => ({ ...prev, [productId]: "/f4.png" }));
  };

  if (loading) {
    return <LoadingPage status="review" />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  if (!reviewProducts.length) {
    return <NoProductFound />;
  }

  
  return (
    <CardContainer>
      {reviewProducts.map((product) => {
        const normalizedProduct: Product = {
          ...product,
          id: product.id ?? product._id ?? "",
        };

        const imgSrc = product.images[0].imageUrl;

        return (
          <PostCard
            key={normalizedProduct._id ?? normalizedProduct.id}
            editProductId={editProductId}
            isOpen={isOpen}
            onCancel={handleCancelEdit}
            imgSrc={imgSrc}
            product={normalizedProduct}
            onImageError={handleImageError}
            onClose={handleClose}
            onEdit={handleEdit}
          />
        );
      })}
    </CardContainer>
  );
};

export default ReviewProducts;
