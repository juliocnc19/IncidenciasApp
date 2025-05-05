import { endpoints } from "../../../utils/constans/endpoints";
import { api } from ".../../../utils/libs/api";

export const deleteUser = async (id: number | string): Promise<void> => {
  await api.delete(endpoints.users.delete(id));
};
