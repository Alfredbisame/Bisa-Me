export interface FollowerUser {
  userid: string;
  name: string;
  profile: string;
  status: string;
}

export interface FollowersResponse {
  follows: FollowerUser[];
  following: FollowerUser[];
}

// New types for the following API response
export interface FollowingUser {
  id: string;
  userInfo: {
    firstName: string;
    lastName: string;
    profilePicture: string;
    email: string;
    phoneNumber: string;
    countryCode: string;
    countryName: string;
    countryShortName: string;
    otherNames: string | null;
  };
  [key: string]: unknown;
}

export interface FollowingApiResponse {
  code: number;
  data: {
    totalCount: number;
    totalPages: number;
    page: number;
    pageSize: number;
    results: FollowingUser[];
  };
  message: string;
}

export interface FollowingResponse {
  success: boolean;
  data: FollowingApiResponse;
}

// Profile type for the UI
export interface Profile {
  id: string;
  user_id: string;
  name: string;
  title: string;
  avatar: string;
  isFollowing: boolean;
}
