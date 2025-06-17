import { endpoints } from "../../../utils/constans/endpoints";
import { api } from "../../../utils/libs/api";
import { InputTokenDevice } from "../../../utils/types/InputTokenDevice";
import DataResponse from "../../../core/response/DataResponse";
import { DeviceToken } from "../../../core/models/DeviceToken";

export const registerToken = async (body: InputTokenDevice):Promise<DataResponse<DeviceToken>> => {
  const {data} = await api.post(endpoints.auth.registerToken,body)
  return data
}