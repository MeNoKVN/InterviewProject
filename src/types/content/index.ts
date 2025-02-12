export interface ContentItem {
  id: string;
  title: string;
  description: string;
  image: string;
  details: {
    capital: string;
    population: number;
    region: string;
    subregion: string;
    languages: string[];
    currencies: Array<{
      name: string;
      symbol: string;
    }>;
    flagDescription?: string;
    maps: {
      google: string;
      openStreet: string;
    };
    timezones: string[];
    continents: string[];
    borders: string[];
  };
}

export interface ContentState {
  data: ContentItem[] | null;
  isLoading: boolean;
  error: string | null;
}
