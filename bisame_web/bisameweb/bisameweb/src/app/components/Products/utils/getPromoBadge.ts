import { Product } from "../FeaturedProducts/types";
import { NewProduct } from "../ProductCard";

export const getPromoBadge = (product: Product | NewProduct): string => {
  let promoBadge: string;

  if (product.akodeaPromoBadge) promoBadge = "/promo/eagle.png";
  else if (product.akwaabaPromoBadge) promoBadge = "/promo/akwaaba.png";
  else if (product.ohenePromoBadge) promoBadge = "/promo/ohene.png";
  else if (product.sikaPromoBadge) promoBadge = "/promo/sika.png";
  else promoBadge = "";

  return promoBadge;
};
