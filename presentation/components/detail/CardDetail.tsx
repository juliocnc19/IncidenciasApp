import { View, Text } from "react-native"
import Incident from "../../../core/models/Incident"
import StatusTag from "../main/StatusTag"
import { formatDate } from "../../../utils/libs/formatDate"

export default function CardDetail({ incident }: { incident: Incident }) {
  return (
    <View className="w-full bg-blue-500 p-3 rounded-md m-3">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-white font-semibold text-2xl">{incident.title}</Text>
        <StatusTag status_id={incident.status_id} />
      </View>
      <View className="bg-blue-400 p-2 rounded-md">
        <View className="mb-4">
          <Text className="text-white font-semibold text-lg">Description</Text>
          <Text className="text-white">{incident.description}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="font-semibold text-white">Fecha</Text>
          <Text className="text-white">{formatDate(incident.created_at)}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="font-semibold text-white">Solicitada por</Text>
          <Text className="text-white">{incident.user.username}</Text>
        </View>
      </View>
    </View>
  )
}

