import Button from '@/components/build/Button'
import { signOut } from 'next-auth/react'
import { ButtonLogoutProps } from './types'

const ButtonLogout = ({}: ButtonLogoutProps) => {
  return <Button onClick={signOut as any}>Sign Out</Button>
}

export default ButtonLogout
