import User from "../../core/models/User"

export type authStorageType = {
  user: User | null
  setUser: (user: User | null) => void
}

