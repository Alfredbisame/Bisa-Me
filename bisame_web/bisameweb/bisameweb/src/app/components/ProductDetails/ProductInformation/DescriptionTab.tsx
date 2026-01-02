import ProductDescription from "./ProductDescription";
import ProductFeatures from "./ProductFeatures";
import SellerInformation from "./SellerInformation";
import type { Product as LocalProduct } from "./types";
import type { Product as SellerProduct } from "../hooks/useSellerData";
import { useSearchParams } from "next/navigation";
import useProductFeature from "../hooks/useProductFeature";

interface DescriptionTabProps {
  product: LocalProduct | null;
  isLoading: boolean;
  error: unknown;
  listingId?: string;
}

const DescriptionTab = ({
  product,
  isLoading,
  error,
  listingId,
}: DescriptionTabProps) => {
  // Convert LocalProduct to SellerProduct type for SellerInformation
  const sellerProduct = product as unknown as SellerProduct | null;
  console.log(sellerProduct);

  const SearchParams = useSearchParams();
  const productId = SearchParams.get("id");

  const featureProduct = useProductFeature(productId);

  return (
    <div
      className={`grid grid-cols-1  gap-8 ${
        featureProduct.features.length == 0
          ? "lg:grid-cols-2"
          : "lg:grid-cols-3"
      }`}
    >
      <ProductDescription
        product={product}
        isLoading={isLoading}
        error={error}
      />

      <ProductFeatures
        features={featureProduct.features}
        isLoading={featureProduct.isLoading}
        product={featureProduct.product}
      />

      <SellerInformation
        product={sellerProduct}
        isLoading={isLoading}
        error={error}
        listingId={listingId}
      />
    </div>
  );
};

export default DescriptionTab;
