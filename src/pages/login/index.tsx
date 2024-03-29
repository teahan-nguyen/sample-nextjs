import type { ReactElement } from 'react'
import Layout from '@/components/combine/Layout'
import { NextPageWithLayout } from '../_app'
import Login from '@/components/assemble/Login'
import GuestGuard from '@/hocs/guestGuard'

const Page: NextPageWithLayout = () => {
  return (
    <GuestGuard>
      <Login />
    </GuestGuard>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
