import { useMutation } from "@tanstack/react-query";
import { deleteIncident } from "../../../data/api/incidents/deleteIncident";

export const useDeleteIncident = () => {
  return useMutation({
    mutationFn: deleteIncident,
  });
};
