import { View, Text, TextInput, ScrollView, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { InputRegisterType } from '../../../utils/types/InputRegisterType';
import { zodResolver } from '@hookform/resolvers/zod';
import { userRegisterSchema } from '../../../utils/schemas/userRegisterSchema';
import { useRegisterUser } from '../../hooks/auth/userRegisterUser';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import MessageError from '../shared/MessageError';
import { authStorage } from '../../../data/storage/authStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinkRegister from './LinkRegister';
import { useRegisterToken } from '../../hooks/auth/useTokenDevice';


export default function RegisterForm() {
  const { control, handleSubmit, formState: { errors }, watch } = useForm<InputRegisterType>({
    resolver: zodResolver(userRegisterSchema)
  });

  const { isPending, isError, mutate } = useRegisterUser()
  const {mutate:mutateRegisterDeviceToken} = useRegisterToken()
  const router = useRouter()
  const [message, setMessage] = useState<string>("")
  const { setUser,deviceToken } = authStorage()
  const formValues = watch();
  const isFormFilled = formValues.first_name?.length > 0 &&
    formValues.last_name?.length > 0 &&
    formValues.cedula?.length > 0 &&
    formValues.email?.length > 0 &&
    formValues.username?.length > 0 &&
    formValues.password?.length > 0 &&
    formValues.repet_password?.length > 0;


  const onSubmit = async (input: InputRegisterType) => {
    mutate(input, {
      onSuccess: async (data) => {
        setUser(data.data)
        if (deviceToken) {
          mutateRegisterDeviceToken({
            device_token: deviceToken,
            user_id: data.data.id
          },{
            onSuccess: (dataToken) => {
              console.log(dataToken)
            },
            onError: (err: any) => {
              console.log(err.response)
            }
          })
        }
        await AsyncStorage.setItem("authToken", data.token || "")
        router.replace("/dashboard")
      },
      onError: (err: any) => {
        setMessage(err.response.data.error)
      }
    })
  };

  return (
    <KeyboardAvoidingView behavior='padding' className='flex-1 justify-around w-screen items-center my-8'>
      <Text className='text-4xl font-bold text-center text-blue-500'>Registro</Text>
      {isError && <MessageError message={message} />}
      <ScrollView showsVerticalScrollIndicator={false}
        className='w-full'
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Controller
          control={control}
          name="first_name"
          render={({ field: { value, onBlur, onChange } }) => (
            <View className='w-[90%] my-3'>
              <Text className='my-1 text-sm font-medium '>Nombre</Text>
              <TextInput
                className='w-full bg-sky-50 p-4 rounded-lg border border-gray-300 focus:border-blue-500'
                placeholder='Romulo'
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
              {errors.first_name && <Text className='text-red-600'>{errors.first_name.message}</Text>}
            </View>
          )}
        />
        <Controller
          control={control}
          name="last_name"
          render={({ field: { value, onBlur, onChange } }) => (
            <View className='w-[90%] my-3'>
              <Text className='my-1 text-sm font-medium'>Apellido</Text>
              <TextInput
                className='w-full bg-sky-50 p-4 rounded-lg border border-gray-300 focus:border-blue-500'
                placeholder='Gallegos'
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
              {errors.last_name && <Text className='text-red-600'>{errors.last_name.message}</Text>}
            </View>
          )}
        />
        <Controller
          control={control}
          name="cedula"
          render={({ field: { value, onBlur, onChange } }) => (
            <View className='w-[90%] my-3'>
              <Text className='my-1 text-sm font-medium'>Cedula</Text>
              <TextInput
                placeholder='Cedula de identidad'
                className='w-full bg-sky-50 p-4 rounded-lg border border-gray-300 focus:border-blue-500'
                keyboardType='numeric'
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
              {errors.cedula && <Text className='text-red-600'>{errors.cedula.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="username"
          render={({ field: { value, onBlur, onChange } }) => (
            <View className='w-[90%] my-3'>
              <Text className='my-1 text-sm font-medium'>Nombre de usuario</Text>
              <TextInput
                className='w-full bg-sky-50 p-4 rounded-lg border border-gray-300 focus:border-blue-500'
                placeholder='ejemplo123'
                autoCapitalize="none"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />

              {errors.username && <Text className='text-red-600'>{errors.username.message}</Text>}
            </View>
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onBlur, onChange } }) => (
            <View className='w-[90%] my-3'>
              <Text className='my-1 text-sm font-medium'>Correo Electronico</Text>
              <TextInput
                className='w-full bg-sky-50 p-4 rounded-lg border border-gray-300 focus:border-blue-500'
                placeholder='ejemplo@ejemplo.com'
                keyboardType='email-address'
                autoCapitalize='none'
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
              {errors.email && <Text className='text-red-600'>{errors.email.message}</Text>}
            </View>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onBlur, onChange } }) => (
            <View className='w-[90%] my-3'>
              <Text className='my-1 text-sm font-medium'>Contraseña</Text>
              <TextInput
                className='w-full bg-sky-50 p-4 rounded-lg border border-gray-300 focus:border-blue-500'
                placeholder="••••••••"
                autoCapitalize="none"
                secureTextEntry
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
              {errors.password && <Text className='text-red-600'>{errors.password.message}</Text>}
            </View>
          )}
        />
        <Controller
          control={control}
          name="repet_password"
          render={({ field: { value, onBlur, onChange } }) => (
            <View className='w-[90%] my-3'>
              <Text className='my-1 text-sm font-medium'>Repetir contraseña</Text>
              <TextInput
                className='w-full bg-sky-50 p-4 rounded-lg border border-gray-300 focus:border-blue-500'
                placeholder="••••••••"
                autoCapitalize="none"
                secureTextEntry
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
              {errors.repet_password && <Text className='text-red-600'>{errors.repet_password.message}</Text>}
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
      <LinkRegister isBack={true} />
    </KeyboardAvoidingView>
  );
};
