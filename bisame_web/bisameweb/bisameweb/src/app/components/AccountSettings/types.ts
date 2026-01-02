export interface AccountInfo {
  name: string;
  phone: string;
  profile: string;
}

export interface AccountImage {
  image_link: string;
}

export interface Shop {
  _id: {
    $oid: string;
  };
  shopid: string;
  userid: string;
  name: string;
  location: string;
  landmark: string;
  phone: string;
  datetime: string;
}

export interface AccountData {
  info: AccountInfo;
  image: AccountImage[];
  shop: Shop[];
} 