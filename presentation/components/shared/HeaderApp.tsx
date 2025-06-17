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
              onPress={toggleMenu}
              className="p-1 rounded-md  bg-white"
            >
              <Ionicons name="menu" size={28} color={"#555"} />
            </TouchableOpacity>
            {/* 
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
              onPress={goToNotifications}
              className="p-1 rounded-md bg-white"
            >
              <Ionicons name="notifications" size={28} color={"#555"} />
            </TouchableOpacity>
            */}
          </>
        ) : (
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
          onPress={onBack} className="p-1 rounded-md bg-white">
            <Ionicons name="chevron-back" size={28} color={"#555"} />
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
