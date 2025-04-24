import { z } from 'zod';

const envSchema = z.object({
  EXPO_PUBLIC_API_URL: z.string(),
});

function environments() {
  const parsed = envSchema.safeParse({
    EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
  });

  if (!parsed.success) {
    console.error('Error en las variables de entorno:', parsed.error.format());
    throw new Error('Variables de entorno incorrectas. Revisa tu archivo .env');
  }

  return parsed.data;
}

export const {EXPO_PUBLIC_API_URL} = environments()



