import React, { useEffect, useState } from "react"
import { FlatList, View, RefreshControl, Text } from "react-native"
import Incident from "../../../core/models/Incident"
import EmptyList from "./EmptyList"
import ItemIncidentList from "./ItemIncidentList"
import MessageError from "../shared/MessageError"
import { incidentStorage } from "../../../data/storage/incidentStorage"
import IncidentFilters from "./IncidentFilters"
import { filterIncidents, IncidentFilters as FilterType } from "../../../utils/libs/filterUtils"

interface ListIncidentProps {
  data?: Incident[]
  isError: boolean
  error: Error | null
  refreshing: boolean
  onRefresh: () => void
}

export default function ListIncident({ data, isError, error, refreshing, onRefresh }: ListIncidentProps) {
  const { setIncidents, incidents } = incidentStorage()
  const [filters, setFilters] = useState<FilterType>({
    statusId: null,
    dateFrom: ''
  })
  const [filteredIncidents, setFilteredIncidents] = useState<Incident[]>([])

  useEffect(() => {
    if (!isError && typeof data !== 'undefined') {
      setIncidents(data);
    }
  }, [data, isError, setIncidents])

  useEffect(() => {
    if (incidents) {
      const filtered = filterIncidents(incidents, filters);
      setFilteredIncidents(filtered);
    }
  }, [incidents, filters])

  const handleStatusChange = (statusId: number | null) => {
    setFilters(prev => ({ ...prev, statusId }));
  };

  const handleDateChange = (dateFrom: string) => {
    setFilters(prev => ({ ...prev, dateFrom }));
  };

  const handleClearFilters = () => {
    setFilters({ statusId: null, dateFrom: '' });
  };

  return (
    <>
      {!isError ?
        <>
          {incidents?.length == 0 ?
            <View className="flex-1 justify-center items-center">
              <EmptyList />
            </View>
            :
            <View className="flex-1">
              {/* Componente de Filtros */}
              <IncidentFilters
                incidents={incidents || []}
                selectedStatusId={filters.statusId}
                onStatusChange={handleStatusChange}
                selectedDate={filters.dateFrom}
                onDateChange={handleDateChange}
                onClearFilters={handleClearFilters}
              />
              
              {/* Lista de Incidencias */}
              <FlatList
                style={{ width: "100%" }}
                data={filteredIncidents}
                renderItem={({ item }) => <ItemIncidentList item={item} />}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={["#3b82f6"]} // blue-500 color
                    tintColor="#3b82f6"
                  />
                }
                ListEmptyComponent={
                  <View className="flex-1 justify-center items-center py-8">
                    <Text className="text-gray-500 text-center">
                      {filters.statusId !== null || filters.dateFrom 
                        ? "No se encontraron incidencias con los filtros aplicados"
                        : "No hay incidencias disponibles"
                      }
                    </Text>
                  </View>
                }
              />
            </View>
          }
        </>
        :
        <MessageError message={(error as any).response.data.detail} />
      }
    </>
  )
}


