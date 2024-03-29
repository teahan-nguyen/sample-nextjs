import { useMemo } from 'react'

import { APP_ROUTES } from '@/constants'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import ButtonLogout from '../ButtonLogout'
import { HeaderProps } from './types'

const Header = ({}: HeaderProps) => {
  const data = useSession()
  const isAuthen = useMemo(() => {
    return data.status === 'authenticated'
  }, [data])

  return (
    <div className="px-4 bg-[#006688] h-[50px] w-full flex justify-between">
      <div className="flex items-center">
        <Link
          className="text-white"
          href={APP_ROUTES.home}
        >
          Bitkub
        </Link>
      </div>
      <div className="flex gap-4 h-full items-center">
        {isAuthen && (
          <>
            <Link
              className="text-white"
              href={APP_ROUTES.userProfile}
            >
              User Profile
            </Link>
            <Link
              className="text-white"
              href={APP_ROUTES.posts.list}
            >
              Posts
            </Link>
          </>
        )}

        {isAuthen ? (
          <ButtonLogout />
        ) : (
          <Link
            className="text-white"
            href={APP_ROUTES.login}
          >
            Login
          </Link>
        )}
      </div>
    </div>
  )
}

export default Header
