import { endpoints } from "../../../utils/constans/endpoints";
import { api } from "../../../utils/libs/api";

export const updateRole = async (id: string | number, role: any): Promise<any> => {
  const { data } = await api.put(endpoints.roles.update(id), role);
  return data;
};
