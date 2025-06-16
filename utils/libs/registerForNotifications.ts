import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { api } from './api';

export async function registerForPushNotificationsAsync(userId:number) {
  if (!Constants.isDevice) {
    alert('Las notificaciones push requieren un dispositivo físico');
    return;
  }
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('No se concedió permiso para notificaciones');
    return;
  }
  let { data: expoPushToken } = await Notifications.getExpoPushTokenAsync();
  console.log('Expo Push Token:', expoPushToken);
  await api.post('https://tu-servidor.com/api/register-token', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ userId, token: expoPushToken }),
  });
}
