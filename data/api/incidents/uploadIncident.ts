import { endpoints } from "../../../utils/constans/endpoints";
import { api } from "../../../utils/libs/api";

export const uploadIncident = async ({
  files,
  incident_id,
}: {
  files: { uri: string; name: string; type: string }[];
  incident_id: number;
}): Promise<any> => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('files', {
      uri: file.uri,
      name: file.name,
      type: file.type,
    } as any);
  });
  formData.append('incident_id', String(incident_id));
  const { data } = await api.post(endpoints.incidents.upload, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};
