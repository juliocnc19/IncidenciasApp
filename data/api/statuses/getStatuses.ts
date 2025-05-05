import { endpoints } from "../../../utils/constans/endpoints";
import { api } from "../../../utils/libs/api";

export const getStatuses = async (): Promise<any> => {
  const { data } = await api.get(endpoints.statuses.getAll);
  return data;
};
