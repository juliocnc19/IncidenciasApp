import DataUser from "../../../core/response/DataUser";
import { endpoints } from "../../../utils/constans/endpoints";
import { api } from "../../../utils/libs/api";
import { InputRegisterType } from "../../../utils/types/InputRegisterType";

export const registerUser = async (input: InputRegisterType): Promise<DataUser> => {
  const { data } = await api.post(endpoints.auth.register, input)
  return data
}
