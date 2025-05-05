import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../../data/api/users/createUser";

export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser,
  });
};
