import User from "../../core/models/User"

export type authStorageType = {
  user: User | null
  deviceToken: string | null
  setUser: (user: User | null) => void
  setDeviceToken: (deviceToken: string | null) => void
}

