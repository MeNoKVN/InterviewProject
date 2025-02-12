import axios from 'axios';
import { ContentItem } from '@/types/content';
import { Country } from '@/types/api';
import { transformCountryToContent } from '@/transforms/content.transform';

const BASE_URL = 'https://restcountries.com/v3.1';

export const contentService = {
  async fetchContent(): Promise<ContentItem[]> {
    try {
      const response = await axios.get<Country[]>(`${BASE_URL}/all`, {
        params: {
          fields: 'name,capital,population,region,subregion,languages,currencies,flags,maps,timezones,continents,borders'
        }
      });

      if (!Array.isArray(response.data)) {
        throw new Error('Invalid response format');
      }

      return response.data
        .map(transformCountryToContent)
        .sort((a, b) => a.title.localeCompare(b.title));

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('API Error:', error.response?.data || error.message);
        throw new Error(`Failed to fetch countries: ${error.message}`);
      }
      console.error('Error fetching countries:', error);
      throw new Error('Failed to fetch countries');
    }
  },

  async deleteContent(id: string): Promise<void> {
    console.log('deleteContent', id);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
};