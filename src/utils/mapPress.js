import axios from 'axios';
import API_CONFIG from '../config/apiConfig';

export async function fetchPrecipitationValues({ latitude, longitude }) {
  try {
    const response = await axios.post(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRECIPITATION_VALUES}`,
      { lat: latitude, lon: longitude }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
