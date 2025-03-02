import axios from "axios";
import config from "../config/config.json";

export const httpService = axios.create({
  baseURL: config.baseURL
});

// перехватчик запроса
httpService.interceptors.request.use(
  (config) => {
    console.log("config", config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// перехватчик ответа
httpService.interceptors.response.use(
  (response) => {
    console.log("response", response);

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
