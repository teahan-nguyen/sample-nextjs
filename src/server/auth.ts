import { APP_ROUTES } from '@/constants'
import { env } from '@/env'
import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import OktaProvider from 'next-auth/providers/okta'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 2 * 60 * 60,
  },

  providers: [
    OktaProvider({
      clientId: env.OKTA_CLIENT_ID,
      clientSecret: env.OKTA_CLIENT_SECRET,
      issuer: env.OKTA_ISSUER,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signOut: APP_ROUTES.login,
    signIn: APP_ROUTES.home,
  },
  callbacks: {
    jwt: async (data) => {
      const { token, user, account } = data
      const getAccessToken = (obj: any) => {
        return obj?.accessToken || obj?.access_token || ''
      }
      const accessToken = getAccessToken(account) || getAccessToken(token)
      return { ...token, ...user, accessToken }
    },
    session: async (data) => {
      const { session, token } = data

      if (session && token) {
        //@ts-ignore: Unreachable code error
        session.user = token
      }

      return session
    },
  },
  secret: env.NEXTAUTH_SECRET,
}
