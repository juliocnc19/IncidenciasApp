import Attachment from "./Attachment"
import Status from "./Status"
import User from "./User"

export default interface Incident {
  id: number
  title: string
  description: string
  status_id: number
  response: string
  user_id: number
  user: User
  created_at: string
  updated_at: string
  attachment: Attachment[]
  status: Status
}
