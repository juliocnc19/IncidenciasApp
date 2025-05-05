import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../../data/api/auth/registerUser";

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: registerUser,
  })
}
