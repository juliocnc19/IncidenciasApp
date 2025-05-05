import { useMutation } from "@tanstack/react-query";
import { updateRole } from "../../../data/api/roles/updateRole";

export const useUpdateRole = () => {
  return useMutation({
    mutationFn: ({ id, ...role }: any) => updateRole(id, role),
  });
};
