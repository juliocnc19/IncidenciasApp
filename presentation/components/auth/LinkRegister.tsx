import { Link } from "expo-router"
import { View, Text } from "react-native"

export default function LinkRegister() {
  return (
    <View>
      <Text>
        ¿Aun no tienes cuenta?
        <Link
          href="/(auth)/register"
        > Registrate</Link>
      </Text>
    </View>
  )
}


