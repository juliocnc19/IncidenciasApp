import { endpoints } from "../../../utils/constans/endpoints";
import { api } from "../../../utils/libs/api";
import DataUser from "../../../core/response/DataUser";

export const getUsers = async (): Promise<DataUser> => {
  const { data } = await api.get(endpoints.users.getAll);
  return data;
};
