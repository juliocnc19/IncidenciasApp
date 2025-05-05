import { endpoints } from "../../../utils/constans/endpoints";
import { api } from "../../../utils/libs/api";

export const deleteStatus = async (id: string | number): Promise<any> => {
  const { data } = await api.delete(endpoints.statuses.delete(id));
  return data;
};
