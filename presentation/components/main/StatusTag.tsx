import { View, Text } from "react-native";
import { statusTag } from "../../../utils/constans/statusTag";
import Incident from "../../../core/models/Incident";

export default function StatusTag({ status_id }: { status_id: Incident["status_id"] }) {
  const tagObject = statusTag[status_id]

  return (
    <View className="bg-white rounded-md p-3">
      <Text style={{ color: tagObject.color }} className="font-semibold">{tagObject.out}</Text>
    </View>

  )
}
