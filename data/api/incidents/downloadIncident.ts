import { endpoints } from "../../../utils/constans/endpoints";
import { api } from "../../../utils/libs/api";

export const downloadIncident = async (filename: string): Promise<any> => {
  const { data } = await api.get(endpoints.incidents.download(filename), { responseType: 'blob' });
  return data;
};
