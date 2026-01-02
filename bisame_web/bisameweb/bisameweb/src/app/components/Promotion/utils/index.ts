import { BenefitProps } from "../PromotionCard";

export function isBenefitArray(val: unknown): val is BenefitProps[] {
  return (
    Array.isArray(val) &&
    val.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        "sectionTitle" in item &&
        "numberOfItemsAllowed" in item
    )
  );
}
