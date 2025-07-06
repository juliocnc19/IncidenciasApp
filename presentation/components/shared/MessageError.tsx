import { Text, View } from "react-native"

const MessageError = ({ message }: { message: string }) => {
  return (
    <View className="p-3 rounded-lg bg-red-50 border border-red-200 w-[90%] mb-4">
      <Text className="text-red-600 text-center font-medium text-sm">{message}</Text>
    </View>
  )
}

export default MessageError
