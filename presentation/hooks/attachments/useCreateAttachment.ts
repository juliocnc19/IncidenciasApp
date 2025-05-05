import { useMutation } from "@tanstack/react-query";
import { createAttachment } from "../../../data/api/attachments/createAttachment";

export const useCreateAttachment = () => {
  return useMutation({
    mutationFn: createAttachment,
  });
};
