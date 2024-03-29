import Layout from '@/components/combine/Layout'
import AuthGuard from '@/hocs/authGuard'
import { useSession } from 'next-auth/react'
import type { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'

const Page: NextPageWithLayout = () => {
  const data = useSession()

  return (
    <AuthGuard>
      <div className=" ">Welcome {data?.data?.user?.name}</div>
    </AuthGuard>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
