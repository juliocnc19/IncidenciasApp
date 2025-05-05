import { endpoints } from "../../../utils/constans/endpoints";
import { api } from "../../../utils/libs/api";
import { LoginInputType } from "../../../utils/types/InputLoginType";
import DataUser from "../../../core/response/DataUser";

export const loginUser = async (body: LoginInputType):Promise<DataUser> => {
  const {data} = await api.post(endpoints.auth.login,body)
  return data
}
