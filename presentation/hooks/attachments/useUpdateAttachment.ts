import { useMutation } from "@tanstack/react-query";
import { updateAttachment } from "../../../data/api/attachments/updateAttachment";

export const useUpdateAttachment = () => {
  return useMutation({
    mutationFn: ({ id, ...attachment }: any) => updateAttachment(id, attachment),
  });
};
