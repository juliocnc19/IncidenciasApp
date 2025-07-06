import axios from "axios";
import { EXPO_PUBLIC_API_URL } from "./environments";
import AsyncStorage from "@react-native-async-storage/async-storage";

const url = EXPO_PUBLIC_API_URL as string

export const api = axios.create({
  baseURL: url,
  timeout: 10000, // 10 segundos de timeout
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

// Interceptor para manejar errores de red
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      // Error de timeout
      return Promise.reject({
        response: {
          data: {
            detail: 'La solicitud tardó demasiado. Compruebe su conexión.'
          }
        }
      });
    }
    
    if (!error.response) {
      // Error de red (sin respuesta del servidor)
      return Promise.reject({
        response: {
          data: {
            detail: 'Compruebe su conexión a internet.'
          }
        }
      });
    }
    
    return Promise.reject(error);
  }
);

