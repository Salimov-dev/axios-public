import axios from "axios";
import config from "../config/config.json";

export const httpService = axios.create({
  baseURL: config.baseURL
});
