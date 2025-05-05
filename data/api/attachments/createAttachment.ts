import { endpoints } from "../../../utils/constans/endpoints";
import { api } from "../../../utils/libs/api";

export const createAttachment = async (attachment: any): Promise<any> => {
  const { data } = await api.post(endpoints.attachments.create, attachment);
  return data;
};
