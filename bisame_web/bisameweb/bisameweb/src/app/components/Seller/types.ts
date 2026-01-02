export interface SellerAdImage {
  image_link: string;
}

export interface SellerAdInfo {
  name: string;
  image: string;
  upgrade: string;
  date: string;
}

export interface SellerAd {
  _id: { $oid: string };
  pageid?: string;
  userid: string;
  title: string;
  category: string;
  subcategory: string;
  childcategory?: string;
  description: string;
  price: string;
  promoted?: string;
  pageview?: string;
  location: string;
  make?: string;
  model?: string;
  year?: string;
  transmission?: string;
  drivetrain?: string;
  fuel?: string;
  condition?: string;
  color?: string;
  mileage?: string;
  exchange?: string;
  seats?: string;
  cylinders?: string;
  engine?: string;
  phone: string;
  nogotiable?: string;
  image: SellerAdImage[];
  addimage?: SellerAdImage[];
  testimonials?: unknown[];
  shops?: unknown[];
  info: SellerAdInfo;
  status?: string;
  message?: string;
  postdate?: string;
  updatepostdate?: string;
  keyFeatures?: string;
}

export interface SellerInfoResponse {
  name: string;
  profile: string;
  phone: string;
  datetime: string;
  ads: number;
  active: number;
  data: SellerAd[];
}