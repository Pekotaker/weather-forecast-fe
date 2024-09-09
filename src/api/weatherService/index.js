import axios from "axios";
import qs from "qs";
import { SERVER_BASE_URL } from "../../config";
import { CurrentPublicIPService } from "../../utils";

const baseURL = `${SERVER_BASE_URL}/weather`;
const http = axios.create({
  baseURL: baseURL,
  timeout: 99999,
  paramsSerializer: (params) => {
    return qs.stringify(params, {
      encode: false,
    });
  },
});

class WeatherService {
  async getWeatherHistory(city) {
    const params = {
      city: city,
    };
    try {
      const response = await http.get(`/getWeatherHistory`, { params });
      return response.data;
    } catch (error) {
      console.error("Error while fetching weather history", error);
      return null;
    }
  }

  // async getCurrentLocationWeather() {
  //   try {
  //     const PublicIP = await CurrentPublicIPService.getCurrentPublicIP();
  //     const params = {
  //       city: PublicIP,
  //     };
  //     const response = await http.get(`/getWeatherHistory`, { params });
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error while fetching current location weather", error);
  //     return null;
  //   }
  // }

  async getCurrentLocationWeather() {
    try {
      const response = await http.get(`/getCurrentLocationWeather`);
      return response.data;
    } catch (error) {
      console.error("Error while fetching current location weather", error);
      return null;
    }
  }
}

export default new WeatherService();
