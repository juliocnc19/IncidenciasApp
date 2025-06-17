import React, { useState } from 'react';
import { View, Text, TextInput, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { LoginInputType } from '../../../utils/types/InputLoginType';
import LinkRegister from './LinkRegister';
import { zodResolver } from '@hookform/resolvers/zod';
import { userLoginSchema } from '../../../utils/schemas/userLoginSchema';
import { useLoginUser } from '../../hooks/auth/useLoginUser';
import MessageError from '../shared/MessageError';
import { useRouter } from 'expo-router';
import { authStorage } from '../../../data/storage/authStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRegisterToken } from '../../hooks/auth/useTokenDevice';

export default function LoginForm() {
  const { control, handleSubmit, formState: { errors }, watch } = useForm<LoginInputType>({
    resolver: zodResolver(userLoginSchema),
  });

  const { setUser,deviceToken } = authStorage()
  const { isPending, isError, mutate } = useLoginUser()
  const {mutate:mutateRegisterDeviceToken} = useRegisterToken()
  const router = useRouter()
  const [message, setMessage] = useState<string>("")
  const formValues = watch();
  const isFormFilled = formValues.email?.length > 0 && formValues.password?.length > 0;

  const onSubmit = async (input: LoginInputType) => {
    mutate(input, {
      onSuccess: async (data) => {
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
        setUser(data.data)
        await AsyncStorage.setItem("authToken", data.token || "")
        router.replace('/dashboard')
      },
      onError: (err: any) => {
        setMessage(err.response.data.detail)
      }
    })
  };


  return (
    <KeyboardAvoidingView behavior='padding' className='flex-1 justify-around w-screen'>
      <View className='items-center'>
        <Text className='text-5xl font-bold text-center text-blue-500'>BIENVENIDO</Text>
        <Text className='text-center text-gray-500'>Para continuar inicie sesion</Text>
        {isError && <MessageError message={message} />}
      </View>
      <View className='items-center'>
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onBlur, onChange } }) => (
            <View className='w-[90%]'>
              <Text className='my-1 text-sm font-medium'>Email</Text>
              <TextInput
                className='w-full bg-sky-50 p-4 rounded-lg border border-gray-300 focus:border-blue-500'
                placeholder="tu@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
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
            <View className='w-[90%] mt-10'>
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
      </View>
      <View className='items-center'>
        <TouchableOpacity onPress={handleSubmit(onSubmit)}
          disabled={isPending || !isFormFilled}
          className={isPending || !isFormFilled ? "bg-gray-400 p-4 rounded-lg w-[90%] mb-3" : "bg-blue-500 p-4 rounded-lg w-[90%] mb-3"}
        >
          {isPending ?
            <ActivityIndicator size={"small"} /> :
            <Text className='text-center text-white font-semibold'>Iniciar Sesión</Text>
          }
        </TouchableOpacity>
        <LinkRegister isBack={false}/>
      </View>
    </KeyboardAvoidingView>
  );
};

