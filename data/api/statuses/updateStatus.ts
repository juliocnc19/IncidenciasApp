import { endpoints } from "../../../utils/constans/endpoints";
import { api } from "../../../utils/libs/api";

export const updateStatus = async (id: string | number, status: any): Promise<any> => {
  const { data } = await api.put(endpoints.statuses.update(id), status);
  return data;
};
