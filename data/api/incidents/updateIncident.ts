import { endpoints } from "../../../utils/constans/endpoints";
import { api } from "../../../utils/libs/api";

export const updateIncident = async (id: string | number, incident: any): Promise<any> => {
  const { data } = await api.put(endpoints.incidents.update(id), incident);
  return data;
};
