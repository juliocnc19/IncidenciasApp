import { endpoints } from "../../../utils/constans/endpoints";
import { api } from "../../../utils/libs/api";

export const uploadIncident = async (formData: FormData): Promise<any> => {
  const { data } = await api.post(endpoints.incidents.upload, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};
