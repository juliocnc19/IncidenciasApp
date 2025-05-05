import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../../../data/api/users/deleteUser";

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: deleteUser,
  });
};
