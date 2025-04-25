import { Link } from "expo-router"
import { View, Text } from "react-native"

export default function LinkRegister() {
  return (
    <View className="my-2">
      <Text>
        ¿Aun no tienes cuenta?
        <Link
          className="text-blue-500"
          href="/register"
        >  Registrate</Link>
      </Text>
    </View>
  )
}


