import { useMutation } from "@tanstack/react-query";
import { registerToken } from "../../../data/api/auth/registerToken";

export const useRegisterToken = () => {
  return useMutation({
    mutationFn: registerToken,
  })
}
