import type { ReactNode } from "react";

export interface DashboardData {
  info: {
    name: string;
    email: string;
    phone: string;
    profile: string;
  };
  lifetime: {
    total: number;
    affiliate: number;
    earnings: number;
  };
  affiliates: {
    today: number;
    week: number;
    month: number;
    total?: number;
  };
  earnings: {
    today: number;
    week: number;
    month: number;
    total?: number;
  };
}

export interface DashboardOptions {
  id: number;
  option: string;
  description: string;
  href: string;
  icon: ReactNode;
}
