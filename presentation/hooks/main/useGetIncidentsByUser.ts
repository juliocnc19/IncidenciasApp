import { useQuery } from "@tanstack/react-query";
import { getIncidentsByUser } from "../../data/api/getIncidentsByUser";
import User from "../../core/models/User";

export const useGetIncidentsByUser = (user_id:User['id'])=>{
  return useQuery({
    queryKey:['incidents',user_id], 
    queryFn: ()=> getIncidentsByUser(user_id), 
    enabled:!!user_id 
  })
}
