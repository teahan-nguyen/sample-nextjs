import { APP_ROUTES } from '@/constants'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

export default function GuestGuard({ children }: { children: ReactNode }) {
  const data = useSession()
  const router = useRouter()
  if (data.status === 'loading') {
    return null
  }

  if (data.status === 'authenticated') {
    router.push(APP_ROUTES.userProfile)
    return null
  }

  return children
}
