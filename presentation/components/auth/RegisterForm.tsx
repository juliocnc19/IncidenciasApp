import { View, Text, TextInput, StyleSheet, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { InputRegister } from '../../../utils/types/InputRegister';
import { zodResolver } from '@hookform/resolvers/zod';
import { userRegisterSchema } from '../../../utils/schemas/userRegisterSchema';
import { backgroundColors, fontColors } from '../../theme/colors';
import { useRegisterUser } from '../../hooks/userRegisterUser';
import { useRouter } from 'expo-router';
import { saveToken } from '../../../utils/lib/saveToken';
import { useState } from 'react';
import MessageError from './MessageError';
import { authStorage } from '../../../data/storage/authStorage';


const RegisterForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<InputRegister>({
    resolver: zodResolver(userRegisterSchema)
  });

  const { isPending, isError, mutate } = useRegisterUser()
  const router = useRouter()
  const [message, setMessage] = useState<string>("")
  const { setUser } = authStorage()

  const onSubmit = async (data: InputRegister) => {
    mutate(data, {
      onSuccess: async (response) => {
        setUser(response.data)
        await saveToken(response.token)
        router.push("/(main)/dashboard")
      },
      onError: (err: any) => {
        setMessage(err.response.data.error)
      }
    })
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      {isError && <MessageError message={message} />}
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Controller
          control={control}
          name="first_name"
          render={({ field: { value, onBlur, onChange } }) => (
            <View style={styles.containerInput}>
              <Text style={styles.textLabel}>Nombre</Text>
              <TextInput
                style={styles.input}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
              {errors.first_name && <Text style={styles.errorText}>{errors.first_name.message}</Text>}
            </View>
          )}
        />
        <Controller
          control={control}
          name="cedula"
          render={({ field: { value, onBlur, onChange } }) => (
            <View style={styles.containerInput}>
              <Text style={styles.textLabel}>Cedula</Text>
              <TextInput
                style={styles.input}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
              {errors.cedula && <Text style={styles.errorText}>{errors.cedula.message}</Text>}
            </View>
          )}
        />

        <Controller
          control={control}
          name="last_name"
          render={({ field: { value, onBlur, onChange } }) => (
            <View style={styles.containerInput}>
              <Text style={styles.textLabel}>Apellido</Text>
              <TextInput
                style={styles.input}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
              {errors.last_name && <Text style={styles.errorText}>{errors.last_name.message}</Text>}
            </View>
          )}
        />
        <Controller
          control={control}
          name="username"
          render={({ field: { value, onBlur, onChange } }) => (
            <View style={styles.containerInput}>
              <Text style={styles.textLabel}>Nombre de usuario</Text>
              <TextInput
                style={styles.input}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />

              {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}
            </View>
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onBlur, onChange } }) => (
            <View style={styles.containerInput}>
              <Text style={styles.textLabel}>Correo Electronico</Text>
              <TextInput
                style={styles.input}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
              {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
            </View>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onBlur, onChange } }) => (
            <View style={styles.containerInput}>
              <Text style={styles.textLabel}>Contraseña</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
              {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
            </View>
          )}
        />
        <Controller
          control={control}
          name="repet_password"
          render={({ field: { value, onBlur, onChange } }) => (
            <View style={styles.containerInput}>
              <Text style={styles.textLabel}>Repetir contraseña</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
              {errors.repet_password && <Text style={styles.errorText}>{errors.repet_password.message}</Text>}
            </View>
          )}
        />
      </ScrollView>
      <Pressable onPress={handleSubmit(onSubmit)}
        style={({ pressed }) => [{
          backgroundColor: pressed ? backgroundColors.ternary : backgroundColors.secondary
        },
        styles.button
        ]}
      >
        {isPending ?
          <ActivityIndicator size={"small"} color={backgroundColors.primary} /> :
          <Text style={styles.buttonText}>Enviar</Text>
        }
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
  },
  scrollContainer: {
    height: "40%"
  },
  button: {
    marginBottom: 10,
    padding: 19,
    borderRadius: 10,
  },
  buttonText: {
    color: fontColors.ternary,
    fontWeight: 500,
    textAlign: 'center',
  },
  input: {
    height: 55,
    padding: 12,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: fontColors.secondary,
    marginTop: 2
  },
  title: {
    fontSize: 36,
    fontWeight: 500,
    textAlign: "center",
    color: fontColors.secondary,
  },
  containerInput: {
    marginVertical: 10
  },
  textLabel: {
    fontSize: 16,
    fontWeight: 500,
    color: fontColors.secondary
  },
  errorText: {
    fontSize: 13,
    color: fontColors.error,
    fontWeight: 500
  },
})



export default RegisterForm
