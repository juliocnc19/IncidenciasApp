import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Attachment from "../../../core/models/Attachment"
import * as DocumentPicker from 'expo-document-picker'
import { useState } from "react"
import { useUploadIncident } from "../../hooks/incidents/useUploadIncident"
import MessageError from "../shared/MessageError"
import MessageSuccess from "../shared/MessageSuccess"
import { useQueryClient } from "@tanstack/react-query"

interface AttachmentsListProps {
  attachments?: Attachment[]
  incidentId: number
  statusId: number
}

interface SelectedFile {
  name: string
  uri: string
  size: number
  type: string
}

export default function AttachmentsList({ attachments, incidentId, statusId }: AttachmentsListProps) {
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([])
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const uploadIncidentMutation = useUploadIncident()
  const loading = uploadIncidentMutation.isPending
  const queryClient = useQueryClient()

  const handleSelectFiles = async () => {
    if (loading) return
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        multiple: true,
        copyToCacheDirectory: true
      })

      if (result.canceled) return

      const newFiles = result.assets.map(file => ({
        name: file.name,
        uri: file.uri,
        size: file.size || 0,
        type: file.mimeType || ''
      }))

      if (selectedFiles.length + newFiles.length > 4) {
        alert('Solo puedes seleccionar un máximo de 4 archivos')
        return
      }

      setSelectedFiles(prev => [...prev, ...newFiles])
    } catch (error) {
      console.error('Error selecting files:', error)
      setErrorMessage('Error al seleccionar archivos')
    }
  }

  const handleRemoveFile = (index: number) => {
    if (loading) return
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleUpload = () => {
    if (loading) return
    setErrorMessage(null)
    setSuccessMessage(null)
    uploadIncidentMutation.mutate(
      {
        files: selectedFiles,
        incident_id: incidentId
      },
      {
        onSuccess: () => {
          setSuccessMessage('Archivos subidos correctamente')
          setSelectedFiles([])
          queryClient.invalidateQueries({ queryKey: ['incidents'] })
          setTimeout(() => setSuccessMessage(null), 2000)
        },
        onError: (err: any) => {
          setErrorMessage(err?.response?.data?.detail || 'Error al subir archivos')
          setTimeout(() => setErrorMessage(null), 2500)
        }
      }
    )
  }

  const canUpload = statusId === 4

  return (
    <View className="flex-1 min-h-[300px]">
      {successMessage && <MessageSuccess message={successMessage} />}
      {errorMessage && <MessageError message={errorMessage} />}

      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-gray-700 text-lg font-semibold">Archivos adjuntos</Text>
        {canUpload && (
          <TouchableOpacity
            onPress={handleSelectFiles}
            className={`bg-blue-500 px-4 py-2 rounded-lg flex-row items-center ${loading ? 'opacity-50' : ''}`}
            disabled={loading}
          >
            <Ionicons name="add-circle-outline" size={20} color="white" />
            <Text className="text-white font-semibold ml-1">Seleccionar</Text>
          </TouchableOpacity>
        )}
      </View>

      {attachments && attachments.length > 0 && (
        <FlatList
          data={attachments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="bg-white p-4 rounded-lg mb-2 flex-row items-center">
              <Ionicons name="document" size={24} color="#3b82f6" />
              <View className="ml-3 flex-1">
                <Text className="text-gray-800 font-medium">{item.attachment_path.replace('uploads/', '')}</Text>
                <Text className="text-gray-500 text-sm">{item.created_at}</Text>
              </View>
            </View>
          )}
          className="max-h-[350px]"
        />
      )}

      {canUpload && selectedFiles.length > 0 && (
        <View className="flex-1">
          <Text className="text-gray-700 text-lg font-semibold mb-2 mt-4">Archivos para subir</Text>
          <FlatList
            data={selectedFiles}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View className="bg-white p-4 rounded-lg mb-2 flex-row items-center">
                <Ionicons name="document" size={24} color="#3b82f6" />
                <View className="ml-3 flex-1">
                  <Text className="text-gray-800 font-medium" numberOfLines={1}>{item.name}</Text>
                  <Text className="text-gray-500 text-sm">
                    {(item.size / 1024).toFixed(1)} KB
                  </Text>
                </View>
                <TouchableOpacity 
                  onPress={() => handleRemoveFile(index)}
                  className={`p-2 ${loading ? 'opacity-50' : ''}`}
                  disabled={loading}
                >
                  <Ionicons name="close-circle" size={24} color="#ef4444" />
                </TouchableOpacity>
              </View>
            )}
            className="max-h-[350px]"
          />
        </View>
      )}

      {(!attachments || attachments.length === 0) && (!canUpload || selectedFiles.length === 0) && (
        <View className="flex-1 items-center justify-center p-4">
          <Ionicons name="document-outline" size={48} color="#94a3b8" />
          <Text className="text-gray-500 text-lg font-medium text-center mt-2">
            No hay archivos adjuntos
          </Text>
        </View>
      )}

      {canUpload && selectedFiles.length > 0 && (
        <View className="absolute left-0 right-0 bottom-0 bg-transparent p-4 items-center z-10">
          <TouchableOpacity
            onPress={handleUpload}
            className={`bg-green-500 px-6 py-3 rounded-lg flex-row items-center justify-center w-full ${loading ? 'opacity-50' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Ionicons name="cloud-upload-outline" size={24} color="white" />
            )}
            <Text className="text-white font-semibold ml-2">{loading ? 'Subiendo...' : 'Subir archivos'}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
} 