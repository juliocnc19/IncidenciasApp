import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import HeaderApp from '../../../presentation/components/shared/HeaderApp';

const notifications = [
  {
    id: 1,
    title: "Nueva Incidencia Creada",
    message: "Se ha creado una nueva incidencia de tipo Adición",
    time: "Hace 5 minutos",
    type: "info",
    read: false
  },
  {
    id: 2,
    title: "Incidencia Resuelta",
    message: "Tu incidencia de tipo Retiro ha sido resuelta",
    time: "Hace 1 hora",
    type: "success",
    read: true
  },
  {
    id: 3,
    title: "Actualización de Estado",
    message: "La incidencia #123 ha cambiado su estado a 'En Proceso'",
    time: "Hace 2 horas",
    type: "warning",
    read: false
  },
  {
    id: 4,
    title: "Comentario Nuevo",
    message: "Se ha agregado un nuevo comentario en tu incidencia",
    time: "Hace 3 horas",
    type: "info",
    read: true
  }
];

export default function Notifications() {
  return (
    <View className="flex-1 bg-white">
      <HeaderApp isBack={true} />
      
      <View className="p-1">
        <Text className="text-3xl font-bold text-blue-500 mb-4 text-center">Notificaciones</Text>
        
        <ScrollView showsVerticalScrollIndicator={false}>
          {notifications.map((notification) => (
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
              key={notification.id}
              className="mb-3 p-4 rounded-lg bg-white mx-2"
            >
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Text className="font-bold text-gray-800">{notification.title}</Text>
                  <Text className="text-gray-600 mt-1">{notification.message}</Text>
                  <Text className="text-gray-400 text-sm mt-2">{notification.time}</Text>
                </View>
                <View className="ml-2">
                  {!notification.read && (
                    <View className="w-3 h-3 rounded-full bg-blue-500" />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
