import { useLocalSearchParams } from "expo-router"
import { ScrollView, View } from "react-native"
import { incidentStorage } from "../../../data/storage/incidentStorage"
import CardDetail from "../../../presentation/components/detail/CardDetail"
import Incident from "../../../core/models/Incident"
import HeaderApp from "../../../presentation/components/shared/HeaderApp"

export default function Detail() {
  const params = useLocalSearchParams<{ id: string }>()
  const { incidents } = incidentStorage()
  const incidentFind = incidents.find((i) => i.id == Number(params.id))

  return (
    <View className="flex-1 bg-slate-100">
      <HeaderApp isBack={true} />
      <ScrollView
        contentContainerStyle={{ flex: 1, alignItems: "center", marginHorizontal:10 }}
        showsVerticalScrollIndicator={false}
    >
      <CardDetail incident={(incidentFind as Incident)} />

    </ScrollView>
    </View>
  )
}
