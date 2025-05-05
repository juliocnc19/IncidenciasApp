import { useMutation } from "@tanstack/react-query";
import { deleteRole } from "../../../data/api/roles/deleteRole";

export const useDeleteRole = () => {
  return useMutation({
    mutationFn: deleteRole,
  });
};
