import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../../data/api/auth/loginUser";


export const useLoginUser = () => {
  return useMutation({
    mutationFn: loginUser,
  })
}
