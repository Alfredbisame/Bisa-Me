export interface StatItem {
  number: string;
  label: string;
  icon: string;
}

export interface ValueItem {
  icon: string;
  title: string;
  description: string;
}

export interface SafetyTip {
  category: string;
  tips: string[];
  icon: string;
  color: string;
}

export interface MousePosition {
  x: number;
  y: number;
}
