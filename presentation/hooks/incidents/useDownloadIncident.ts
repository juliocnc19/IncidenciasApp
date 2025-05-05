import { useMutation } from "@tanstack/react-query";
import { downloadIncident } from "../../../data/api/incidents/downloadIncident";

export const useDownloadIncident = () => {
  return useMutation({
    mutationFn: downloadIncident,
  });
};
