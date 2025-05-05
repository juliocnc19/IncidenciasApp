import { endpoints } from "../../../utils/constans/endpoints";
import { api } from "../../../utils/libs/api";
import User from "../../../core/models/User";

export const updateUser = async (id: User['id'], user: Partial<User>): Promise<User> => {
  const { data } = await api.put(endpoints.users.update(id), user);
  return data;
};
