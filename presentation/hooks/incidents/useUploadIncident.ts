import { useMutation } from "@tanstack/react-query";
import { uploadIncident } from "../../../data/api/incidents/uploadIncident";

export const useUploadIncident = () => {
  return useMutation({
    mutationFn: uploadIncident,
  });
};
