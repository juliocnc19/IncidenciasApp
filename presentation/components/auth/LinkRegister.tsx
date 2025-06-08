import { Text, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

export default function LinkRegister({isBack}: {isBack: boolean}) {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  const handleRegister = () => {
    router.push("/register")
  }
  
  return (
    <TouchableOpacity className="flex-row justify-between items-center my-2" onPress={() => isBack ? handleBack() : handleRegister()}>
      <Text className="text-blue-500 font-semibold">
        {isBack ? "¿Ya tienes cuenta? Inicia sesión" : "¿Aun no tienes cuenta? Registrate"}
      </Text>
      <Ionicons name={isBack ? "arrow-back" : "arrow-forward"} size={24} color="#007AFF" />
    </TouchableOpacity>
  )
}


