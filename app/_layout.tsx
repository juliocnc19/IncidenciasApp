import "../global.css";
import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import { queryClient } from "../utils/libs/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { registerForPushNotificationsAsync } from "../utils/libs/registerForNotifications";
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/Lato-Regular.ttf'),
  });

  const notificationListener = useRef<Notifications.EventSubscription | null>(null);
  const responseListener = useRef<Notifications.EventSubscription | null>(null);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      console.log('Token:', token);
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notificación recibida:', notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Interacción con notificación:', response);
    });

    if (loaded) {
      SplashScreen.hideAsync();
    }

    return () => {
      if (notificationListener.current) { 
        notificationListener.current.remove();
      }
      if (responseListener.current) {
        responseListener.current.remove();
      }
    };
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView className="flex-1">
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "fade",
          }}
        >
          <Stack.Screen name="(views)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </QueryClientProvider>
  );
}

