export interface PurchaseRecord {
  invocieID: string;
  name: string;
  amount: string;
  status: 'Paid' | 'Unpaid' | 'FAILED' | 'SUCCESSFUL' | 'PENDING';
  datetime: string;
}

export interface PurchaseItem {
  invocieID: string;
  name: string;
  amount: string;
  status: string;
  datetime: string;
}

export interface PurchasesResponse {
  purchases: PurchaseItem[];
} 