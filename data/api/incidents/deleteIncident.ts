import { endpoints } from "../../../utils/constans/endpoints";
import { api } from "../../../utils/libs/api";

export const deleteIncident = async (id: string | number): Promise<any> => {
  const { data } = await api.delete(endpoints.incidents.delete(id));
  return data;
};
