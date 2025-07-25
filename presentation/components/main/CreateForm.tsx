import { View, Text, TextInput, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import MessageError from '../shared/MessageError';
import { InputIncidentType } from '../../../utils/types/InputIncidentType';
import { incidentSchema } from '../../../utils/schemas/incidentSchema';
import { typeIncidents } from '../../../utils/constans/typeIncidents';
import { useCreateIncident } from '../../hooks/incidents/useCreateIncident';
import MessageSuccess from '../shared/MessageSuccess';
import { authStorage } from '../../../data/storage/authStorage';

export default function CreateForm() {
  const { control, handleSubmit, formState: { errors }, watch, reset } = useForm<InputIncidentType>({
    resolver: zodResolver(incidentSchema),
    defaultValues: {
      title: "Adición",
      description: ""
    }
  });

  const { isPending, isError, mutate } = useCreateIncident()
  const router = useRouter()
  const { user } = authStorage()
  const [message, setMessage] = useState<string>("")
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const formValues = watch();
  const isFormFilled = formValues.title?.length > 0 && formValues.description?.length > 0;

  const onSubmit = async (input: InputIncidentType) => {
    
    const bodyApi = {
      title: input.title,
      description: input.description,
      status_id: 4,
      response: "",
      user_id: user!.id
    }

    mutate(bodyApi, {
      onSuccess: async (data) => {
        setSuccessMessage("Incidencia Creada")
        setTimeout(() => {
          reset()
          setSuccessMessage(null)
          router.navigate("/dashboard")
        }, 700)
      },
      onError: (err: any) => {
        setMessage(err.response.data.detail)
      }
    })
  };

  return (
    <View className='flex-1 justify-around w-screen items-center bg-white my-8'>
      <Text className='text-3xl font-bold text-center text-blue-500'>Nueva Incidencia</Text>
      {isError && <MessageError message={message} />}
      {successMessage && <MessageSuccess message={successMessage} />}
      <ScrollView showsVerticalScrollIndicator={false}
        className='w-full'
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Controller
          control={control}
          name="title"
          render={({ field: { value, onBlur, onChange } }) => (
            <View className='w-[90%] my-3'>
              <Text className='my-1 text-sm font-medium'>Tipo</Text>
              <View className='flex-row justify-between w-full'>
                {Object.values(typeIncidents).map((type) => (
                  <TouchableOpacity
                    key={type.out}
                    onPress={() => onChange(type.out)}
                    onBlur={onBlur}
                    className={`flex-1 mx-1 p-4 rounded-lg border border-gray-300 ${value === type.out
                        ? 'bg-blue-400'
                        : 'bg-sky-50'
                      }`}
                  >
                    <Text
                      className={`text-center font-medium ${value === type.out
                          ? 'text-white'
                          : 'text-gray-700'
                        }`}
                    >
                      {type.out}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {errors.title && <Text className='text-red-600'>{errors.title.message}</Text>}
            </View>
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ field: { value, onBlur, onChange } }) => (
            <View className='w-[90%] my-3'>
              <Text className='my-1 text-sm font-medium'>Materias</Text>
              <TextInput
                className='w-full bg-sky-50 p-4 rounded-lg h-3/5 border border-gray-300 focus:border-blue-500'
                placeholder='Electiva V (1), Algebra bolena'
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                multiline={true}
                textAlignVertical="top"
                style={{ textAlign: 'left' }}
              />
              <Text
                className='text-gray-500 text-sm'
              >{`Agregue la lista de materias separadas por comas (si es adición, tambien agregar entre parentesis la sección, si es retiro, no basta este detalle)`}</Text>
              {errors.description && <Text className='text-red-600'>{errors.description.message}</Text>}
            </View>
          )}
        />
      </ScrollView>
      <TouchableOpacity onPress={handleSubmit(onSubmit)}
        disabled={isPending || !isFormFilled}
        className={isPending || !isFormFilled ? "bg-gray-400 p-4 rounded-lg w-[90%] mb-3" : "bg-blue-500 p-4 rounded-lg w-[90%] mb-3"}
      >
        {isPending ?
          <ActivityIndicator size={"small"} /> :
          <Text className='text-center text-white font-semibold'>Enviar</Text>
        }
      </TouchableOpacity>
    </View>
  );
};


