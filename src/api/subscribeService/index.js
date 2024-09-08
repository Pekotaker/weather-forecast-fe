import axios from "axios";
import qs from "qs";
import { SERVER_BASE_URL } from "../../config";

const baseURL = `${SERVER_BASE_URL}/subscription`;
const http = axios.create({
  baseURL: baseURL,
  timeout: 99999,
  paramsSerializer: (params) => {
    return qs.stringify(params, {
      encode: false,
    });
  },
});

class SubscribeService {
  async subscribe(email, city = null) {
    const params = {
      email: email,
    };
    if (city) {
      params.city = city;
    }
    try {
      const response = await http.post(`/subscribe`, null, {
        params: params,
      });
      return response.data;
    } catch (error) {
      console.error("Error while subscribing", error);
      return null;
    }
  }
}

export default new SubscribeService();
