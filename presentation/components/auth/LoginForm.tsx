import React, { useState } from 'react';
import { View, Text, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { LoginInputType } from '../../../utils/types/InputLoginType';
import LinkRegister from './LinkRegister';
import { zodResolver } from '@hookform/resolvers/zod';
import { userLoginSchema } from '../../../utils/schemas/userLoginSchema';
import { useLoginUser } from '../../hooks/auth/useLoginUser';
import MessageError from './MessageError';
import { useRouter } from 'expo-router';
import { authStorage } from '../../../data/storage/authStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginForm(){
  const { control, handleSubmit, formState: { errors } } = useForm<LoginInputType>({
    resolver: zodResolver(userLoginSchema),
  });

  const { setUser } = authStorage()
  const { isPending, isError, mutate } = useLoginUser()
  const router = useRouter()
  const [message, setMessage] = useState<string>("")

  const onSubmit = async (input: LoginInputType) => {
    mutate(input, {
      onSuccess: async (data) => {
        setUser(data.data)
        await AsyncStorage.setItem("authToken", data.token)
        router.replace('/dashboard')
      },
      onError: (err: any) => {
        setMessage(err.response.data.detail)
      }
    })
  };


  return (
    <View>
      <View>
        <Text>BIENVENIDO</Text>
        <Text>Para continuar inicie sesion</Text>
      </View>
      <View>
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onBlur, onChange } }) => (
            <View>
              <Text>Email</Text>
              <TextInput
                autoComplete='email'
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
              {errors.email && <Text>{errors.email.message}</Text>}
            </View>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onBlur, onChange } }) => (
            <View
            >
              <Text>Contraseña</Text>
              <TextInput
                secureTextEntry
                value={value}
                autoComplete='password'
                onBlur={onBlur}
                onChangeText={onChange}
              />
              {errors.password && <Text>{errors.password.message}</Text>}
            </View>
          )}
        />
      </View>
      <View>
        {isError && <MessageError message={message} />}
        <TouchableOpacity onPress={handleSubmit(onSubmit)}
        >
          {isPending ?
            <ActivityIndicator size={"small"} /> :
            <Text>Iniciar Sesión</Text>
          }
        </TouchableOpacity>
        <LinkRegister />
      </View>
    </View>
  );
};

