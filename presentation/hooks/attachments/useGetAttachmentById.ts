import { useQuery } from "@tanstack/react-query";
import { getAttachmentById } from "../../../data/api/attachments/getAttachmentById";

export const useGetAttachmentById = (id: string | number) => {
  return useQuery({
    queryKey: ["attachments", id],
    queryFn: () => getAttachmentById(id),
    enabled: !!id,
  });
};
