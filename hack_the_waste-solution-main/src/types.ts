export interface WasteError {
  item: string;
  percentage: number;
}

export interface Section {
  title: string;
  description: string;
  icon: string;
  items: string[];
}