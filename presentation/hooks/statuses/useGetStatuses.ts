import { useQuery } from "@tanstack/react-query";
import { getStatuses } from "../../../data/api/statuses/getStatuses";

export const useGetStatuses = () => {
  return useQuery({
    queryKey: ["statuses"],
    queryFn: getStatuses,
  });
};
