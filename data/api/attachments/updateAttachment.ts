import { endpoints } from "../../../utils/constans/endpoints";
import { api } from "../../../utils/libs/api";

export const updateAttachment = async (id: string | number, attachment: any): Promise<any> => {
  const { data } = await api.put(endpoints.attachments.update(id), attachment);
  return data;
};
