import { Text,View } from "react-native"

const MessageError = ({ message }: { message: string }) => {
  return (
    <View className="p-2 rounded-lg bg-red-50 w-3/4 m-2">
      <Text className="text-red-500 text-center font-bold">{message}</Text>
    </View>
  )
}


export default MessageError
