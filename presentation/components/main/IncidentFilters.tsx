import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Incident from '../../../core/models/Incident';
import { statusTag } from '../../../utils/constans/statusTag';
import DatePickerModal from './DatePickerModal';

interface IncidentFiltersProps {
  incidents: Incident[];
  selectedStatusId: number | null;
  onStatusChange: (statusId: number | null) => void;
  selectedDate: string;
  onDateChange: (date: string) => void;
  onClearFilters: () => void;
}

export default function IncidentFilters({
  incidents,
  selectedStatusId,
  onStatusChange,
  selectedDate,
  onDateChange,
  onClearFilters
}: IncidentFiltersProps) {
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);

  // Crear opciones de status basadas en statusTag.ts
  const statusOptions = useMemo(() => {
    return Object.entries(statusTag).map(([id, status]) => ({
      id: parseInt(id),
      name: status.out,
      textual: status.textual,
      color: status.color
    }));
  }, []);

  const selectedStatus = statusOptions.find(status => status.id === selectedStatusId) || null;
  const hasActiveFilters = selectedStatusId !== null || selectedDate;

  return (
    <View className="bg-white p-4 border-b border-gray-200">
      <Text className="text-lg font-semibold text-gray-800 mb-3">Filtros</Text>
      
      <View className="flex-row space-x-2 mb-3">
        {/* Filtro por Status */}
        <TouchableOpacity
          onPress={() => setShowStatusModal(true)}
          className="flex-1 bg-blue-50 border border-blue-200 rounded-lg p-3 flex-row items-center justify-between mr-3"
        >
          <View className="flex-1">
            <Text className="text-sm text-gray-600">Estado</Text>
            <Text className="text-blue-600 font-medium">
              {selectedStatus ? selectedStatus.name : 'Todos'}
            </Text>
          </View>
          <Ionicons name="chevron-down" size={20} color="#3b82f6" />
        </TouchableOpacity>

        {/* Filtro por Fecha */}
        <TouchableOpacity
          onPress={() => setShowDateModal(true)}
          className="flex-1 bg-blue-50 border border-blue-200 rounded-lg p-3 flex-row items-center justify-between"
        >
          <View className="flex-1">
            <Text className="text-sm text-gray-600">Desde</Text>
            <Text className="text-blue-600 font-medium">
              {selectedDate ? selectedDate : 'Cualquier fecha'}
            </Text>
          </View>
          <Ionicons name="calendar-outline" size={20} color="#3b82f6" />
        </TouchableOpacity>
      </View>

      {/* Botón para limpiar filtros */}
      {hasActiveFilters && (
        <TouchableOpacity
          onPress={onClearFilters}
          className="bg-gray-100 border border-gray-300 rounded-lg p-3 flex-row items-center justify-center"
        >
          <Ionicons name="refresh" size={20} color="#6b7280" />
          <Text className="text-gray-700 font-medium ml-2">Limpiar filtros</Text>
        </TouchableOpacity>
      )}

      {/* Modal para seleccionar Status */}
      <Modal
        visible={showStatusModal}
        transparent={true}
        animationType="none"
        onRequestClose={() => setShowStatusModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-lg max-h-96">
            <View className="p-4 border-b border-gray-200 flex-row items-center justify-between">
              <Text className="text-lg font-semibold">Seleccionar Estado</Text>
              <TouchableOpacity onPress={() => setShowStatusModal(false)}>
                <Ionicons name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={[{ id: 0, name: 'Todos', textual: 'all', color: '#6b7280' }, ...statusOptions]}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onStatusChange(item.id === 0 ? null : item.id);
                    setShowStatusModal(false);
                  }}
                  className="p-4 border-b border-gray-100 flex-row items-center"
                >
                  <View 
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: item.color }}
                  />
                  <Text className={`text-lg flex-1 ${selectedStatusId === item.id ? 'text-blue-600 font-semibold' : 'text-gray-800'}`}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* DatePickerModal para seleccionar Fecha */}
      <DatePickerModal
        visible={showDateModal}
        onClose={() => setShowDateModal(false)}
        onDateSelect={onDateChange}
        currentDate={selectedDate}
      />
    </View>
  );
} 