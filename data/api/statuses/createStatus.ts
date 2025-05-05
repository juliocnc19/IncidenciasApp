import { endpoints } from "../../../utils/constans/endpoints";
import { api } from "../../../utils/libs/api";

export const createStatus = async (status: any): Promise<any> => {
  const { data } = await api.post(endpoints.statuses.create, status);
  return data;
};
