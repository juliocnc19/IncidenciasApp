import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authStorage } from '../../../data/storage/authStorage';

interface SideMenuProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function SideMenu({ isVisible, onClose }: SideMenuProps) {
  const router = useRouter();
  const slideAnim = useRef(new Animated.Value(-Dimensions.get('window').width)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { user } = authStorage();

  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -Dimensions.get('window').width,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [isVisible]);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    router.replace('/login');
  };

  return (
    <>
      {isVisible && (
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View 
            className="absolute top-0 left-0 w-full h-full bg-gray-800/50 backdrop-blur-sm z-40"
            style={{
              opacity: fadeAnim
            }}
          />
        </TouchableWithoutFeedback>
      )}
      <Animated.View 
        className="absolute top-0 left-0 w-4/5 h-full bg-white z-50 shadow-lg"
        style={{
          transform: [{ translateX: slideAnim }]
        }}
      >
        <View className="p-2 border-b border-gray-200">
          <TouchableOpacity onPress={onClose} className="p-2">
            <Ionicons name="close" size={28} color="#555" />
          </TouchableOpacity>
        </View>

        <View className="flex-1 p-4">
          <View className="flex-row items-center gap-4">
            <Ionicons name="person" size={32} color="#555" />
            <Text className="text-gray-500 text-xl font-semibold">{user?.username}</Text>
          </View>
          <View className="flex-row items-center gap-4 mt-6">
            <Text className="text-gray-500 text-lg font-medium">Nombre:</Text>
            <Text className="text-gray-500 text-lg font-normal">{user?.first_name + " " + user?.last_name}</Text>
          </View>
          <View className="flex-row items-center gap-4">
            <Text className="text-gray-500 text-lg font-medium">Cédula:</Text>
            <Text className="text-gray-500 text-lg font-normal">{user?.cedula}</Text>
          </View>
        </View>

        <View className="p-4 border-t border-gray-200">
          <TouchableOpacity 
            className="flex-row items-center justify-center bg-red-600 p-3 rounded-lg gap-2"
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={24} color="#fff" />
            <Text className="text-white text-base font-semibold">Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
} 