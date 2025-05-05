import { useMutation } from "@tanstack/react-query";
import { updateIncident } from "../../../data/api/incidents/updateIncident";

export const useUpdateIncident = () => {
  return useMutation({
    mutationFn: ({ id, ...incident }: any) => updateIncident(id, incident),
  });
};
