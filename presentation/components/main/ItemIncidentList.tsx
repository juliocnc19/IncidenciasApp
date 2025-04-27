import { useRouter } from 'expo-router'
import { View, TouchableOpacity, Text } from 'react-native'
import Incident from '../../../core/models/Incident'
import { formatDate } from '../../../utils/libs/formatDate'
import StatusTag from './StatusTag'

export default function ItenIncidentList({ item }: { item: Incident }) {
  const router = useRouter()
  return (
    <TouchableOpacity 
      className='flex-row bg-blue-500 justify-between p-4 m-3 rounded-md'
      onPress={() => router.navigate(`/${item.id}`)}>
      <View>
        <Text className='text-lg font-semibold text-white'>{item.title}</Text>
        <Text className='text-white text-sm'>{formatDate(item.created_at)}</Text>
      </View>
      <StatusTag status_id={item.status_id} />
    </TouchableOpacity>

  )
}
