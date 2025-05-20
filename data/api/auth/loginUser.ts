import { endpoints } from "../../../utils/constans/endpoints";
import { api } from "../../../utils/libs/api";
import { LoginInputType } from "../../../utils/types/InputLoginType";
import DataResponse from "../../../core/response/DataResponse";
import User from "../../../core/models/User";

export const loginUser = async (body: LoginInputType):Promise<DataResponse<User>> => {
  const {data} = await api.post(endpoints.auth.login,body)
  return data
}
