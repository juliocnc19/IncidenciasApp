import { authStorage } from "../../data/storage/authStorage"
import { useGetIncidentsByUser } from "../../presentation/hooks/main/useGetIncidentsByUser"
import { ActivityIndicator, View, Text } from "react-native"
import ListIncident from "../../presentation/components/main/ListIncidents"


export default function Dashboard() {
  const { user } = authStorage()
  const { data, isLoading, isError, error } = useGetIncidentsByUser(user!.id)
  return (
    <View className="flex-1 bg-white">
      <Text className="font-medium text-gray-600 text-3xl mx-2 my-5">Mis Incidencias</Text>
      {(isLoading) ?
        <ActivityIndicator size={"large"} /> :
        <ListIncident data={data?.data} isError={isError} error={error} />
      }
    </View>
  )
}
