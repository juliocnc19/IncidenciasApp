import { useMutation } from "@tanstack/react-query";
import { deleteStatus } from "../../../data/api/statuses/deleteStatus";

export const useDeleteStatus = () => {
  return useMutation({
    mutationFn: deleteStatus,
  });
};
