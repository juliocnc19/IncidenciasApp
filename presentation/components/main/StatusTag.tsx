import { View, Text } from "react-native";
import { statusTag } from "../../../utils/constans/statusTag";
import Incident from "../../../core/models/Incident";

export default function StatusTag({ status_id }: { status_id: Incident["status_id"] }) {
  const tagObject = statusTag[status_id as keyof typeof statusTag]

  return (
    <View className="rounded-lg p-3" style={{ backgroundColor: tagObject.color }}>
      <Text className="font-semibold text-white">{tagObject.out}</Text>
    </View>

  )
}
