import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import Animated from "react-native-reanimated";

export default function MainLayout() {
  return (
    <Tabs initialRouteName="dashboard"
    >
      <Tabs.Screen name="dashboard"
        options={{
          title: "Incidencias",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Animated.View style={{
              transform: [{ scale: focused ? 1.2 : 1 }]
            }}>
              <Ionicons name="home-outline" size={25} color={color} />
            </Animated.View>
          )
        }}
      />
      <Tabs.Screen name="create"
        options={{
          title: "Nueva",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Animated.View style={{
              transform: [{ scale: focused ? 1.2 : 1 }]
            }}>
              <Ionicons name="create-outline" size={25} color={color} />
            </Animated.View>
          )
        }}
      />
    </Tabs>
  )
}
