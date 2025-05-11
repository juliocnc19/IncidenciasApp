import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";

export default function EmptyList() {
  return (
    <View className="flex justify-center items-center">
      <Ionicons name="information-circle-outline" size={28} color={"#555"} />
      <Text className="text-center text-gray-500 font-medium text-2xl">Aun no tienes incidencias creadas</Text>
    </View>
  )
}
