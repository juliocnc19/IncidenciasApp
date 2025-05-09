
import { View, Text, TextInput, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegisterUser } from '../../hooks/auth/userRegisterUser';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import MessageError from '../shared/MessageError';
import { authStorage } from '../../../data/storage/authStorage';
import { InputIncidentType } from '../../../utils/types/InputIncidentType';
import { incidentSchema } from '../../../utils/schemas/incidentSchema';


export default function CreateForm() {
  const { control, handleSubmit, formState: { errors }, watch } = useForm<InputIncidentType>({
    resolver: zodResolver(incidentSchema)
  });

  const { isPending, isError, mutate } = useRegisterUser()
  const router = useRouter()
  const [message, setMessage] = useState<string>("")
  const { setUser } = authStorage()
  const formValues = watch();
  const isFormFilled = formValues.title?.length > 0 && formValues.description?.length > 0;


  const onSubmit = async (input: InputIncidentType) => {
    /*
    mutate(input, {
      onSuccess: async (data) => {
        setUser(data.data)
        await AsyncStorage.setItem("authToken", data.token)
        router.push("/dashboard")
      },
      onError: (err: any) => {
        setMessage(err.response.data.error)
      }
    })
    */
  };

  return (
    <View className='flex-1 justify-around w-screen items-center my-8 bg-white'>
      <Text className='text-3xl font-bold text-center text-blue-500'>Nueva Incidencia</Text>
      {isError && <MessageError message={message} />}
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
              <TextInput
                className='w-full bg-sky-50 p-4 rounded-lg'
                placeholder='Tipo de incidencia'
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
              {errors.title && <Text className='text-red-600'>{errors.title.message}</Text>}
            </View>
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ field: { value, onBlur, onChange } }) => (
            <View className='w-[90%] my-3'>
              <Text className='my-1 text-sm font-medium'>description</Text>
              <TextInput
                className='w-full bg-sky-50 p-4 rounded-lg h-3/5'
                placeholder='Descripcion'
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
              <Text
                className='text-gray-500 text-sm'
              >Agregue una descripcion breve pero acorde, de tal forma que sera mas facil realizar una resolucion satisfactoria</Text>
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


