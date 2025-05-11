import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import SideMenu from "./SideMenu";

export default function HeaderApp({ isBack }: { isBack: boolean }) {
  const router = useRouter();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const onBack = () => {
    router.back();
  };

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const goToNotifications = () => {
    router.push("/notifications");
  };

  return (
    <>
      <View className="flex flex-row p-3 items-center justify-between">
        {!isBack ? (
          <>
            <TouchableOpacity 
              onPress={toggleMenu}
              className="p-1 border rounded-md border-gray-700 bg-white"
            >
              <Ionicons name="menu" size={30} color={"#555"} />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={goToNotifications}
              className="p-1 border rounded-md border-gray-700 bg-white"
            >
              <Ionicons name="notifications" size={30} color={"#555"} />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={onBack} className="p-1 border rounded-md border-gray-700 bg-white">
            <Ionicons name="chevron-back" size={30} color={"#555"} />
          </TouchableOpacity>
        )}
      </View>
      <SideMenu 
        isVisible={isMenuVisible} 
        onClose={() => setIsMenuVisible(false)} 
      />
    </>
  );
}
