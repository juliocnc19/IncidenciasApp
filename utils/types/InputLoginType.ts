import User from "../../core/models/User"

export type LoginInputType = {
  email: User['email']
  password: User['password']
}
