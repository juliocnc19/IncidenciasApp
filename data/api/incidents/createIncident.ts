import Incident from "../../../core/models/Incident";
import DataResponse from "../../../core/response/DataResponse";
import { endpoints } from "../../../utils/constans/endpoints";
import { api } from "../../../utils/libs/api";

export type IncidentTypeApi = {
  title: Incident["title"],
  description: Incident['description']
  status_id: Incident["status_id"]
  response: Incident["response"]
  user_id: Incident["user_id"]
}


export const createIncident = async (incident: IncidentTypeApi): Promise<DataResponse<Incident>> => {
  const { data } = await api.post(endpoints.incidents.create, incident);
  return data;
};
