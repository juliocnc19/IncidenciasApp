import { Stack } from "expo-router";

export default function DetailLayout(){
  return (
    <Stack>
      <Stack.Screen name="[id]" options={{ headerShown: false, animation:"fade" }} />
      <Stack.Screen name="notifications" options={{ headerShown: false, animation:"fade" }} />
    </Stack>
  )
}
