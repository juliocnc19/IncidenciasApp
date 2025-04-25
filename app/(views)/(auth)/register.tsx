import { View } from "react-native"
import RegisterForm from "../../../presentation/components/auth/RegisterForm"

export default function Register(){
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <RegisterForm/>
    </View>
  )
}
