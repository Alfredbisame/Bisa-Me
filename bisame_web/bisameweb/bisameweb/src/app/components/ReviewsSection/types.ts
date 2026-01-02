
export interface Reply {

  id: string;
  reviewerId: string;
  reviewerName: string;
  message: string;
  isSeller: boolean;
  date: string;


  userid?: string;
  reply?: string; 
  postdate?: string; 
  name?: string; 
  profile?: string;
}


export type Replies = Reply;

export interface Review {
  reviewid: string;
  name: string;
  profile: string;
  productname: string;
  image: string;
  description: string;
  price: string;
  comment: string;
  rating: number;
  postdate: string;
  reply?: Reply[]; // now Reply === Replies
}

// API response shape
export interface ReviewsResponse {
  reviews: Review[];
  total: number;
  average_rating: number;
}
