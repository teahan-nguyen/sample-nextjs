import Button from '@/components/build/Button'
import { APP_ROUTES } from '@/constants'
import { signIn } from 'next-auth/react'
import { LoginProps } from './types'

const Login = ({}: LoginProps) => {
  return (
    <div className="shadow p-4 m-4 mx-auto w-[400px] h-[600px] justify-center items-center flex ">
      <div className="flex gap-2 ">
        <Button
          onClick={() => {
            signIn('okta', { callbackUrl: APP_ROUTES.userProfile })
          }}
        >
          Login With Okta
        </Button>
        <Button
          onClick={() => {
            signIn('google', { callbackUrl: APP_ROUTES.userProfile })
          }}
        >
          Login With Google
        </Button>
      </div>
    </div>
  )
}

export default Login
