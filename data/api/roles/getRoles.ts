import { endpoints } from "../../../utils/constans/endpoints";
import { api } from "../../../utils/libs/api";

export const getRoles = async (): Promise<any> => {
  const { data } = await api.get(endpoints.roles.getAll);
  return data;
};
