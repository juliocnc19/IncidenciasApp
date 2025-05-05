import { endpoints } from "../../../utils/constans/endpoints";
import { api } from "../../../utils/libs/api";

export const getIncidents = async (): Promise<any> => {
  const { data } = await api.get(endpoints.incidents.getAll);
  return data;
};
