export type MainTab = 'info' | 'howto';
export type InfoSubTab = 'mainpage' | 'buysell' | 'bisametv';
export type HowtoSubTab = 'register' | 'earnincome' | 'promotions';

export interface TabConfig {
  id: string;
  label: string;
  icon?: string;
}

export interface ContentSection {
  title: string;
  content: React.ReactNode;
}
