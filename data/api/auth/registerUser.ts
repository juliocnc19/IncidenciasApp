import DataResponse from "../../../core/response/DataResponse";
import User from "../../../core/models/User";
import { endpoints } from "../../../utils/constans/endpoints";
import { api } from "../../../utils/libs/api";
import { InputRegisterType } from "../../../utils/types/InputRegisterType";

export const registerUser = async (input: InputRegisterType): Promise<DataResponse<User>> => {
  const { data } = await api.post(endpoints.auth.register, input)
  return data
}
