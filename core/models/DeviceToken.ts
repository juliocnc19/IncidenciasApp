import User from "./User"

export interface DeviceToken {
    id?: number
    user_id: number
    device_token: string
    created_at?: string
    user?: User
}
