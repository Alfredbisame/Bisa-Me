export interface AffiliateUser {
  name: string;
  profile: string;
  status: string;
  datetime: string;
}

export interface EarningsData {
  week: unknown[];
  month: unknown[];
}

export interface AffiliateResponse {
  affiliate: AffiliateUser[];
  earnings: EarningsData[];
  invitecode: string;
}

export interface RevenueData {
  id: number;
  affiliateName: string;
  totalAffiliates: number;
  direct: number;
  indirect: number;
  total: number;
  status: 'Pending' | 'Applied' | 'Expired';
}

export interface RevenueTotals {
  affiliates: number;
  direct: number;
  indirect: number;
  total: number;
}

export interface AffiliateEarningItem {
  name: string;
  Direct: string;
  Indirect: string;
  total: string;
} 