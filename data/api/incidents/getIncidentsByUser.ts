import { endpoints } from "../../../utils/constans/endpoints";
import { api } from "../../../utils/libs/api";
import User from "../../../core/models/User";
import DataResponse from "../../../core/response/DataResponse";
import Incident from "../../../core/models/Incident";

export const getIncidentsByUser = async (user_id: User['id']): Promise<DataResponse<Incident[]>> => {
  const { data } = await api.get(endpoints.incidents.getByUser(user_id))
  return data
}
