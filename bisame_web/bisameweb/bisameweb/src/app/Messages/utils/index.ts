import axios from "axios";

export const fetcher = async (url: string) => {
  try {
    const { data } = await axios.get<Response>(url);

    if (!data) {
      throw new Error("Error occurred fetching data");
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};


export const replyEquivalence = (reply: string): string => {
  let equivalence: string = "";
  switch (reply) {
    case "Last price":
      equivalence = "What is the last price?";
      break;
    case "Ask for location":
      equivalence = "What is your location?";
      break;
    case "Make an offer":
      equivalence = "I would like to make an offer";
      break;
    case "Please call":
      equivalence = "Please call me to discuss";
      break;
    case "Let's schedule a meeting":
      equivalence = "Where can we meet?";
      break;
  }

  return equivalence;
};