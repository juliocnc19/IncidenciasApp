import { endpoints } from "../../../utils/constans/endpoints";
import { api } from "../../../utils/libs/api";
import User from "../../../core/models/User";

export const createUser = async (user: Partial<User>): Promise<User> => {
  const { data } = await api.post(endpoints.users.create, user);
  return data;
};
