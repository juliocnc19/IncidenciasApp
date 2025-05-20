
import { Text, View } from "react-native"
const MessageSuccess = ({ message }: { message: string }) => {
  return (
    <View className="p-2 rounded-lg bg-green-50 w-3/4 m-2">
      <Text className="text-green-500 text-center font-bold">{message}</Text>
    </View>
  )
}


export default MessageSuccess
