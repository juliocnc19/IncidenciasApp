import { useQuery } from "@tanstack/react-query";
import { getAttachments } from "../../../data/api/attachments/getAttachments";

export const useGetAttachments = () => {
  return useQuery({
    queryKey: ["attachments"],
    queryFn: getAttachments,
  });
};
