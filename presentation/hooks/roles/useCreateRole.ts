import { useMutation } from "@tanstack/react-query";
import { createRole } from "../../../data/api/roles/createRole";

export const useCreateRole = () => {
  return useMutation({
    mutationFn: createRole,
  });
};
