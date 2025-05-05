import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../../data/api/users/getUsers";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};
