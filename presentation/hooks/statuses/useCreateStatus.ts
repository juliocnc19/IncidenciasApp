import { useMutation } from "@tanstack/react-query";
import { createStatus } from "../../../data/api/statuses/createStatus";

export const useCreateStatus = () => {
  return useMutation({
    mutationFn: createStatus,
  });
};
