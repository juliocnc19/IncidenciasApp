import { FlatList, View, RefreshControl } from "react-native"
import Incident from "../../../core/models/Incident"
import EmptyList from "./EmptyList"
import ItemIncidentList from "./ItemIncidentList"
import MessageError from "../shared/MessageError"
import { incidentStorage } from "../../../data/storage/incidentStorage"
import { useEffect } from "react"

interface ListIncidentProps {
  data?: Incident[]
  isError: boolean
  error: Error | null
  refreshing: boolean
  onRefresh: () => void
}

export default function ListIncident({ data, isError, error, refreshing, onRefresh }: ListIncidentProps) {
  const { setIncidents, incidents } = incidentStorage()

  useEffect(() => {
    if (!isError && typeof data !== 'undefined') {
      setIncidents(data);
    }
  }, [data, isError, setIncidents])

  return (
    <>
      {!isError ?
        <>
          {incidents?.length == 0 ?
            <View className="flex-1 justify-center items-center">
              <EmptyList />
            </View>
            :
            <View>
              <FlatList
                style={{ width: "100%" }}
                data={incidents}
                renderItem={({ item }) => <ItemIncidentList item={item} />}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={["#3b82f6"]} // blue-500 color
                    tintColor="#3b82f6"
                  />
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


