import { Text,View } from "react-native"

const MessageError = ({ message }: { message: string }) => {
  return (
    <View>
      <Text>{message}</Text>
    </View>
  )
}


export default MessageError
