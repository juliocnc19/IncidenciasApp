import Incident from "../../core/models/Incident"

export type IncidentStorageType = {
  incidents: Incident[],
  setIncidents: (Incidents: Incident[]) => void
}
