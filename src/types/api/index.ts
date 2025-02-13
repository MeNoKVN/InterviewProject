/**
 * Country interface
 * @description This is picked data from the API ( doesnt include all fields )
 */
export interface Country {
  name: {
    common: string;
    official: string;
  };
  capital: string[];
  population: number;
  region: string;
  subregion: string;
  languages: {
    [key: string]: string;
  };
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  timezones: string[];
  continents: string[];
  borders: string[];
}
