import { useQuery } from "@tanstack/react-query";
import { getRoles } from "../../../data/api/roles/getRoles";

export const useGetRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });
};
