import { View, Text } from "react-native"
import Incident from "../../../core/models/Incident"
import StatusTag from "../main/StatusTag"
import { formatDate } from "../../../utils/libs/formatDate"

export default function CardDetail({ incident }: { incident: Incident }) {
  return (
    <View 
    style={{
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    }}
    className="w-full bg-white p-4 rounded-lg m-3">
      <View className="flex-row justify-between items-center mb-4 border-b-2 border-gray-200 pb-2">
        <Text className="text-black font-semibold text-2xl">{incident.title}</Text>
        <StatusTag status_id={incident.status_id} />
      </View>
      <View className="bg-white` p-2 rounded-md">
        <View className="mb-4">
          <Text className="text-gray-600 font-semibold text-lg">Description</Text>
          <Text className="text-gray-600">{incident.description}</Text>
        </View>
        {![1, 4].includes(incident.status_id) && (
        <View className="mb-6">
          <Text className="font-semibold text-gray-600">Respuesta</Text>
          <Text className="text-gray-600">{incident.response}</Text>
        </View>
        )}
        <View className="flex-row justify-between">
          <Text className="font-semibold text-gray-600">Fecha</Text>
          <Text className="text-gray-600">{formatDate(incident.created_at)}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="font-semibold text-gray-600">Solicitada por</Text>
          <Text className="text-gray-600">{incident.user.username}</Text>
        </View>
      </View>
    </View>
  )
}

