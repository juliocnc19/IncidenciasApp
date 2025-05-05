import { endpoints } from "../../../utils/constans/endpoints";
import { api } from "../../../utils/libs/api";

export const createIncident = async (incident: any): Promise<any> => {
  const { data } = await api.post(endpoints.incidents.create, incident);
  return data;
};
