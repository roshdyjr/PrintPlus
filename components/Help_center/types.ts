export interface HelpCategory {
  id: number;
  name: string;
  helpItems: HelpItem[];
}

export interface HelpItem {
  id: number;
  title: string;
  description: string;
}