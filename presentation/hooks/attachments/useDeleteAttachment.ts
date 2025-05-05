import { useMutation } from "@tanstack/react-query";
import { deleteAttachment } from "../../../data/api/attachments/deleteAttachment";

export const useDeleteAttachment = () => {
  return useMutation({
    mutationFn: deleteAttachment,
  });
};
