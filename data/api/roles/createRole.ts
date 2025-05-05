import { endpoints } from "../../../utils/constans/endpoints";
import { api } from "../../../utils/libs/api";

export const createRole = async (role: any): Promise<any> => {
  const { data } = await api.post(endpoints.roles.create, role);
  return data;
};
