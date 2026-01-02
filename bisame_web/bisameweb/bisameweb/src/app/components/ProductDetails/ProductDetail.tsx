"use client";

import { FC } from "react";
import ProductActionButtons from "./ProductActionButtons";
import ProductImageGallery from "./ProductImageGallery";
import ProductInfo from "./ProductInfo";
import LoadingSkeleton from "./LoadingSkeleton";
import ErrorDisplay from "./ErrorDisplay";
import { useProductData } from "./hooks/useProductData";
import { useProductActions } from "./hooks/useProductActions";
import ViewsAndFollow from "./ViewsAndFollow";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/app/hooks/useUser";
import toast from "react-hot-toast";

// Updated interfaces to match the new API structure
interface ProductImage {
  imageUrl: string;
  id: string;
}

interface ProductUserInfo {
  name: string;
  profilePicture: string;
}

export interface Product {
  _id: string;
  id: string;
  title: string;
  description: string;
  category: string;
  subCategory: string;
  price: number | string;
  contactNumber: string;
  totalViews: number;
  location: string;
  userId: string;
  isPromoted: boolean;
  images: ProductImage[];
  userInfo: ProductUserInfo;
  status: string;
  negotiable: boolean;
  attributes: object;
  isFavorite: boolean;
  totalReviews: number;
  isFollowed: boolean;
  createdAt: string;
  updatedAt: string;
  brand?: string;
  availability?: string;
  rating?: number;
  reviews?: number | unknown[];
  [key: string]: unknown;
}

const ProductDetail: FC = () => {
  const searchParams = useSearchParams();
  const listingId = searchParams.get("id");

  const { product, isLoading, hasError, error, mutate: mutateProduct } = useProductData(listingId);
  const router = useRouter();
  const { user } = useUser();

  const {
    handleFollowToggle,
    handleFavoriteToggle,
    isFollowing,
    isSaving,
  } = useProductActions({ product, mutate: mutateProduct });

  // Event handlers
  const handleChatClick = () => {
    console.log("Opening chat for product:", product?.title);
    // Chat implementation
    if (!user?.authenticated) {
      toast.success("Chat functionality requires that you are authorized");
      router.push("/UserAccounts/SignIn");
    }
  };

  const handleTradeAssuranceClick = () => {
    console.log("Opening Trade Assurance");
    // Trade assurance implementation
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (hasError || !product) {
    return (
      <ErrorDisplay error={error} onRetry={() => window.location.reload()} />
    );
  }

  console.log(product);

  return (
    <div className="px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-56 sm:py-6 md:py-8">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Product Image Section */}
        <ProductImageGallery product={product} />

        {/* Product Details Section */}
        <div className="flex-1 lg:mt-0 lg:ml-8">
          <ViewsAndFollow
            views={product?.totalViews ?? 0}
            userId={product?.userId}
            isFollowed={product?.isFollowed ?? false}
            isFavorite={product?.isFavorite ?? false}
            listingId={listingId}
            onFollowToggle={handleFollowToggle}
            onFavoriteToggle={handleFavoriteToggle}
            isFollowing={isFollowing}
            isSaving={isSaving}
          />
          <ProductInfo product={product} />
          <ProductActionButtons
            authenticated={user?.authenticated}
            onChatClick={handleChatClick}
            onTradeAssuranceClick={handleTradeAssuranceClick}
            phoneNumber={product?.contactNumber}
            productTitle={product?.title}
            sellerId={product?.userId}
            sellerName={product?.userInfo?.name}
            listingId={listingId || undefined}
            currentUserId={user?.id}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
export type { ProductImage };
