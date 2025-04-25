import { View } from "react-native";
import LoginForm from "../../../presentation/components/auth/LoginForm";

export default function Login() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <LoginForm />
    </View>
  )
}
