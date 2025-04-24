import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../../data/api/loginUser";


export const useLoginUser = () => {
  return useMutation({
    mutationFn: loginUser,
  })
}
