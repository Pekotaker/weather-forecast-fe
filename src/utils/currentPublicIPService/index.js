// Using a free service for IP API
// https://api.ipify.org?format=json

import axios from "axios";

const http = axios.create({
  baseURL: "https://api.ipify.org?format=json",
  timeout: 99999,
});

class CurrentPublicIPService {
  async getCurrentPublicIP() {
    try {
      const response = await http.get();
      return response.data.ip;
    } catch (error) {
      console.error("Error while fetching current public IP", error);
      return null;
    }
  }
}

export default new CurrentPublicIPService();
