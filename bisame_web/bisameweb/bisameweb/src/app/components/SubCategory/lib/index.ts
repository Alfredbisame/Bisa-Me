export type CategoryType =
  | "services"
  | "products"
  | "books"
  | "foods"
  | "jobs"
  | "jobseek"
  | "health";

export const getFormattedCategory = (category: CategoryType) => {
  let formattedCategory;
  switch (category) {
    case "foods":
      formattedCategory = "Food";
      break;
    case "products":
      formattedCategory = "Buy and Sell";
      break;
    case "jobseek":
      formattedCategory = "Job Seekers";
      break;
    case "services":
    case "books":
    case "jobs":
    case "health":
      formattedCategory = category[0].toUpperCase() + category.slice(1);
      break;
    default:
      break;
  }

  return formattedCategory;
};
