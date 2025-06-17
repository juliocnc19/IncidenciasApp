import { create } from "zustand";
import { authStorageType } from "../../utils/types/authStorageType";

export const authStorage = create<authStorageType>((set) => ({
  user: null,
  deviceToken: null,
  setUser: (newUser) => set({ user: newUser }),
  setDeviceToken: (newDeviceToken) => set({ deviceToken: newDeviceToken })
}))
