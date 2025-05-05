import { useQuery } from "@tanstack/react-query";
import { getIncidents } from "../../../data/api/incidents/getIncidents";

export const useGetIncidents = () => {
  return useQuery({
    queryKey: ["incidents"],
    queryFn: getIncidents,
  });
};
