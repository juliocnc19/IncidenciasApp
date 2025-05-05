import { endpoints } from "../../../utils/constans/endpoints";
import { api } from "../../../utils/libs/api";

export const getAttachments = async (): Promise<any> => {
  const { data } = await api.get(endpoints.attachments.getAll);
  return data;
};
