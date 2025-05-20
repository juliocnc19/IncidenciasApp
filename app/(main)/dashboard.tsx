import { authStorage } from "../../data/storage/authStorage"
import { useGetIncidentsByUser } from "../../presentation/hooks/incidents/useGetIncidentsByUser"
import { ActivityIndicator, View, Text } from "react-native"
import ListIncident from "../../presentation/components/main/ListIncidents"
import HeaderApp from "../../presentation/components/shared/HeaderApp"


export default function Dashboard() {
  const { user } = authStorage()
  const { data, isLoading, isError, error } = useGetIncidentsByUser(user!.id)
  return (
    <View className="flex-1 bg-slate-100">
      <HeaderApp isBack={false} />
      <Text className="font-medium text-gray-600 text-2xl mx-2 my-5 text-center">Mis Incidencias</Text>
      {(isLoading) ?
        <ActivityIndicator size={"large"} /> :
        <ListIncident data={data?.data} isError={isError} error={error} />
      }
    </View>
  )
}
