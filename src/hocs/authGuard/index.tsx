import { APP_ROUTES } from '@/constants'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

export default function AuthGuard({ children }: { children: ReactNode }) {
  const data = useSession()
  const router = useRouter()
  if (data.status === 'loading') {
    return null
  }

  if (data.status === 'unauthenticated') {
    router.push(APP_ROUTES.login)
    return null
  }

  return children
}
