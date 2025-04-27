import { FlatList, View } from "react-native"
import Incident from "../../../core/models/Incident"
import EmptyList from "./EmptyList"
import ItemIncidentList from "./ItemIncidentList"
import MessageError from "../shared/MessageError"
import { incidentStorage } from "../../../data/storage/incidentStorage"
import { useEffect } from "react"

export default function ListIncident({ data, isError, error }: { data?: Incident[], isError: boolean, error: Error | null }) {
  const { setIncidents, incidents } = incidentStorage()

  useEffect(() => {

    if (!isError && data && data.length > 0) {
      setIncidents(data)
    }

  }, [data])
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


