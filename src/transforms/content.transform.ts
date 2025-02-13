import { Country } from '@/types/api';
import { ContentItem } from '@/types/content';

/**
 * Transforms a country object into a ContentItem ( Api Type -> Content Type )
 * @param country country object
 * @returns ContentItem
 */

export const transformCountryToContent = (country: Country): ContentItem => ({
  id: country.name.common,
  title: country.name.official,
  description: `${country.region} • ${
    country.capital?.[0] || 'N/A'
  } • ${country.population.toLocaleString()} people`,
  image: country.flags.png,
  details: {
    capital: country.capital?.[0] || 'N/A',
    population: country.population,
    region: country.region,
    subregion: country.subregion,
    languages: Object.values(country.languages || {}),
    currencies: Object.values(country.currencies || {}).map(currency => ({
      name: currency.name,
      symbol: currency.symbol
    })),
    flagDescription: country.flags.alt,
    maps: {
      google: country.maps.googleMaps,
      openStreet: country.maps.openStreetMaps
    },
    timezones: country.timezones,
    continents: country.continents,
    borders: country.borders
  }
}); 