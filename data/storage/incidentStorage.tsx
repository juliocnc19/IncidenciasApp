import { create } from "zustand";
import { IncidentStorageType } from "../../utils/types/incidentStorageType";

export const incidentStorage = create<IncidentStorageType>((set) => ({
  incidents: [],
  setIncidents: (listIncidents) => set({ incidents: listIncidents })
}))
