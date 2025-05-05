import { endpoints } from "../../../utils/constans/endpoints";
import { api } from "../../../utils/libs/api";

export const deleteRole = async (id: string | number): Promise<any> => {
  const { data } = await api.delete(endpoints.roles.delete(id));
  return data;
};
