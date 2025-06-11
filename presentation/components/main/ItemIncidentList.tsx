import { useRouter } from 'expo-router'
import { View, TouchableOpacity, Text } from 'react-native'
import Incident from '../../../core/models/Incident'
import { formatDate } from '../../../utils/libs/formatDate'
import StatusTag from './StatusTag'

export default function ItenIncidentList({ item }: { item: Incident }) {
  const router = useRouter()
  return (
    <TouchableOpacity 
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
      className='flex-row justify-between p-5 m-3 rounded-xl bg-white'
      onPress={() => router.navigate(`/${item.id}`)}>
      <View>
        <Text className='text-xl font-semibold'>{item.title}</Text>
        <Text className='text-sm'>{formatDate(item.created_at)}</Text>
      </View>
      <StatusTag status_id={item.status_id} />
    </TouchableOpacity>

  )
}
