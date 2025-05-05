import { useMutation } from "@tanstack/react-query";
import { createIncident } from "../../../data/api/incidents/createIncident";

export const useCreateIncident = () => {
  return useMutation({
    mutationFn: createIncident,
  });
};
