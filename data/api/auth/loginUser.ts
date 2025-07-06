import { endpoints } from "../../../utils/constans/endpoints";
import { api } from "../../../utils/libs/api";
import { LoginInputType } from "../../../utils/types/InputLoginType";
import DataResponse from "../../../core/response/DataResponse";
import User from "../../../core/models/User";
import { checkInternetConnection } from "../../../utils/libs/networkUtils";

export const loginUser = async (body: LoginInputType): Promise<DataResponse<User>> => {
  // Verificar conectividad antes de hacer la llamada
  const isConnected = await checkInternetConnection();
  if (!isConnected) {
    throw {
      response: {
        data: {
          detail: 'Compruebe su conexión a internet.'
        }
      }
    };
  }

  try {
    const { data } = await api.post(endpoints.auth.login, body);
    return data;
  } catch (error: any) {
    // Re-lanzar el error para que sea manejado por el interceptor de axios
    throw error;
  }
};
