import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../../../data/api/users/updateUser";

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: ({ id, ...user }: any) => updateUser(id, user),
  });
};
