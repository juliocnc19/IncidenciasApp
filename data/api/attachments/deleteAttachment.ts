import { endpoints } from "../../../utils/constans/endpoints";
import { api } from "../../../utils/libs/api";

export const deleteAttachment = async (id: string | number): Promise<any> => {
  const { data } = await api.delete(endpoints.attachments.delete(id));
  return data;
};
