import { endpoints } from "../../../utils/constans/endpoints";
import { api } from "../../../utils/libs/api";

export const getAttachmentById = async (id: string | number): Promise<any> => {
  const { data } = await api.get(endpoints.attachments.getById(id));
  return data;
};
