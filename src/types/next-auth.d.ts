//@ts-ignore: Unreachable code error
// eslint-disable-next-line
import NextAuth from 'next-auth/next'

declare module 'next-auth' {
  interface Session {
    user: {
      name: string
      email: string
      sub: string
      id: string
      accessToken: string
      iat: number
      exp: number
      jti: string
    }
  }
}
