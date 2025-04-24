import axios from "axios";
import { EXPO_PUBLIC_API_URL } from "./environments";
import AsyncStorage from "@react-native-async-storage/async-storage";

const url = EXPO_PUBLIC_API_URL as string

export const api = axios.create({
  baseURL:url
})

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

