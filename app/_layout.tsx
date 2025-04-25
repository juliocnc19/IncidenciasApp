import "../global.css"
import { Stack } from "expo-router"
import { useFonts } from 'expo-font';
import { queryClient } from "../utils/libs/queryClient"
import { QueryClientProvider } from "@tanstack/react-query"
import { StatusBar } from "expo-status-bar"
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync()

export default function Layout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/Lato-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView className="flex-1">
        <StatusBar style="auto" />
        <Stack
          screenOptions={{
            headerShown:false,
            animation:"fade"
          }}
        >
          <Stack.Screen name="(views)" options={{ headerShown: false }} />
          <Stack.Screen name="(main)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </QueryClientProvider>
  )
}
