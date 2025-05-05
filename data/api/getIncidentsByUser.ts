import { endpoints } from "../../utils/constans/endpoints";
import { api } from "../../utils/libs/api";
import User from "../../core/models/User";
import DataIncidents from "../../core/response/DataIncidents";

export const getIncidentsByUser = async (user_id: User['id']): Promise<DataIncidents> => {
  const { data } = await api.get(endpoints.incidents.getByUser(user_id))
  return data
}
