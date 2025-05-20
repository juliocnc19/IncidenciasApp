import { useLocalSearchParams } from "expo-router"
import { View } from "react-native"
import { incidentStorage } from "../../../data/storage/incidentStorage"
import CardDetail from "../../../presentation/components/detail/CardDetail"
import AttachmentsList from "../../../presentation/components/detail/AttachmentsList"
import Incident from "../../../core/models/Incident"
import HeaderApp from "../../../presentation/components/shared/HeaderApp"

export default function Detail() {
  const params = useLocalSearchParams<{ id: string }>()
  const { incidents } = incidentStorage()
  const incidentFind = incidents.find((i) => i.id == Number(params.id))

  return (
    <View className="flex-1 bg-slate-100">
      <HeaderApp isBack={true} />
      <View style={{ flex: 1, alignItems: "center", marginHorizontal: 10 }}>
        <CardDetail incident={incidentFind as Incident} />
        <View className="w-full mt-4" style={{ flex: 1 }}>
          <AttachmentsList
            statusId={incidentFind!.status_id}
            attachments={incidentFind?.attachment}
            incidentId={Number(params.id)}
          />
        </View>
      </View>
    </View>
  )
}
