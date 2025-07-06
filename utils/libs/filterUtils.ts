import Incident from "../../core/models/Incident";
import { statusTag } from "../constans/statusTag";

export interface IncidentFilters {
  statusId: number | null;
  dateFrom: string;
}

export const filterIncidents = (
  incidents: Incident[],
  filters: IncidentFilters
): Incident[] => {
  return incidents.filter((incident) => {
    // Filtro por status
    if (filters.statusId !== null && incident.status_id !== filters.statusId) {
      return false;
    }

    // Filtro por fecha
    if (filters.dateFrom) {
      const incidentDate = new Date(incident.created_at);
      const filterDate = new Date(filters.dateFrom);
      
      // Comparar solo la fecha (sin hora)
      const incidentDateOnly = new Date(
        incidentDate.getFullYear(),
        incidentDate.getMonth(),
        incidentDate.getDate()
      );
      const filterDateOnly = new Date(
        filterDate.getFullYear(),
        filterDate.getMonth(),
        filterDate.getDate()
      );
      
      if (incidentDateOnly < filterDateOnly) {
        return false;
      }
    }

    return true;
  });
};

// Función para obtener el nombre del status basado en statusTag.ts
export const getStatusName = (statusId: number): string => {
  const status = statusTag[statusId as keyof typeof statusTag];
  return status ? status.out : 'Desconocido';
};

// Función para obtener el color del status basado en statusTag.ts
export const getStatusColor = (statusId: number): string => {
  const status = statusTag[statusId as keyof typeof statusTag];
  return status ? status.color : '#6b7280';
}; 