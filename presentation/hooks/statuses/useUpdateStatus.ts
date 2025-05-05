import { useMutation } from "@tanstack/react-query";
import { updateStatus } from "../../../data/api/statuses/updateStatus";

export const useUpdateStatus = () => {
  return useMutation({
    mutationFn: ({ id, ...status }: any) => updateStatus(id, status),
  });
};
