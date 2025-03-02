// src/types/icon.d.ts (or directly in IconReducer.ts)
export interface Icon {
  id: string; // Example: Ensure you use the actual data properties
  text_eng: string;
  background_image_url: string;
  // Add any other properties that your icon data has
}

export interface IconsState {
  data: Icon[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

export interface TitleItem {
  id: string;
  url: string;
  'Title-Topic': string;
  user?: string;
  time?: string;
  comments?: {
    message?: string; // message is now nested within comments
  };
  votes?: number;
  img_url?: string; // Optional image URL
}

export interface LocalData {
  header: string;
  titles: TitleItem[];
}

export interface TredPageProps {
  params: {
    tag: string;
  };
}
