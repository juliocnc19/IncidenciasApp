import { useQuery } from "@tanstack/react-query";
import { getAttachmentsByIncident } from "../../../data/api/attachments/getAttachmentsByIncident";

export const useGetAttachmentsByIncident = (incidentId: string | number) => {
  return useQuery({
    queryKey: ["attachments", "incident", incidentId],
    queryFn: () => getAttachmentsByIncident(incidentId),
    enabled: !!incidentId,
  });
};
