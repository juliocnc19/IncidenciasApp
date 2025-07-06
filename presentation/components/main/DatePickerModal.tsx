import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DatePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onDateSelect: (date: string) => void;
  currentDate?: string;
}

export default function DatePickerModal({
  visible,
  onClose,
  onDateSelect,
  currentDate
}: DatePickerModalProps) {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const firstDay = getFirstDayOfMonth(selectedYear, selectedMonth);
    const days = [];

    // Agregar días vacíos al inicio
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: null, disabled: true });
    }

    // Agregar días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ day, disabled: false });
    }

    return days;
  };

  const handleDateConfirm = () => {
    if (selectedDay) {
      const month = (selectedMonth + 1).toString().padStart(2, '0');
      const day = selectedDay.toString().padStart(2, '0');
      const dateString = `${selectedYear}-${month}-${day}`;
      onDateSelect(dateString);
      onClose();
    }
  };

  const handleClear = () => {
    onDateSelect('');
    onClose();
  };

  const calendarDays = generateCalendarDays();

  return (
    <Modal
      className='bg-black/2'
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-lg">
          <View className="p-4 border-b border-gray-200 flex-row items-center justify-between">
            <Text className="text-lg font-semibold">Seleccionar Fecha</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>
          
          <View className="p-4">
            {/* Selector de Año y Mes */}
            <View className="flex-row justify-between items-center mb-4">
              <TouchableOpacity
                onPress={() => setSelectedYear(selectedYear - 1)}
                className="p-2"
              >
                <Ionicons name="chevron-back" size={24} color="#3b82f6" />
              </TouchableOpacity>
              
              <View className="flex-row items-center space-x-4">
                <Text className="text-lg font-semibold">{selectedYear} </Text>
                <Text className="text-lg font-semibold">{months[selectedMonth]}</Text>
              </View>
              
              <TouchableOpacity
                onPress={() => setSelectedYear(selectedYear + 1)}
                className="p-2"
              >
                <Ionicons name="chevron-forward" size={24} color="#3b82f6" />
              </TouchableOpacity>
            </View>

            {/* Selector de Mes */}
            <View className="mb-4">
              <FlatList
                horizontal
                data={months}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => setSelectedMonth(index)}
                    className={`px-3 py-2 mx-1 rounded-lg ${
                      selectedMonth === index ? 'bg-blue-500' : 'bg-gray-200'
                    }`}
                  >
                    <Text className={`${
                      selectedMonth === index ? 'text-white' : 'text-gray-700'
                    }`}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
                showsHorizontalScrollIndicator={false}
              />
            </View>

            {/* Calendario */}
            <View className="bg-gray-50 rounded-lg p-4 mb-4">
              <View className="flex-row justify-between mb-2">
                {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                  <Text key={day} className="text-gray-600 text-center w-8">
                    {day}
                  </Text>
                ))}
              </View>
              
              <View className="flex-row flex-wrap">
                {calendarDays.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => !item.disabled && setSelectedDay(item.day)}
                    disabled={item.disabled}
                    className={`w-8 h-8 items-center justify-center mx-1 my-1 rounded-lg ${
                      item.disabled 
                        ? 'opacity-30' 
                        : selectedDay === item.day 
                          ? 'bg-blue-500' 
                          : 'bg-white'
                    }`}
                  >
                    {item.day && (
                      <Text className={`${
                        selectedDay === item.day ? 'text-white' : 'text-gray-700'
                      }`}>
                        {item.day}
                      </Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Botones de acción */}
            <View className="flex-row space-x-2">
              <TouchableOpacity
                onPress={handleClear}
                className="flex-1 bg-gray-200 rounded-lg p-3"
              >
                <Text className="text-center font-medium">Limpiar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={handleDateConfirm}
                disabled={!selectedDay}
                className={`flex-1 rounded-lg p-3 ${
                  selectedDay ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <Text className={`text-center font-medium ${
                  selectedDay ? 'text-white' : 'text-gray-500'
                }`}>
                  Confirmar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
} 