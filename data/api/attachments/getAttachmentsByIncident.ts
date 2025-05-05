import { endpoints } from "../../../utils/constans/endpoints";
import { api } from "../../../utils/libs/api";

export const getAttachmentsByIncident = async (incidentId: string | number): Promise<any> => {
  const { data } = await api.get(endpoints.attachments.getByIncident(incidentId));
  return data;
};
