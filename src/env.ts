import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    DATABASE_URL: z
    .string()
    .min(1),
    OKTA_CLIENT_ID: z.string().min(1),
    OKTA_CLIENT_SECRET: z.string().min(1),
    OKTA_ISSUER: z.string().url(),
    NEXTAUTH_SECRET: z.string().min(1),
    SPA_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    

    NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string().url(),
  },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  experimental__runtimeEnv: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
})
