import Layout from '@/components/combine/Layout'
import ListPost from '@/components/integrate/ListPost'
import AuthGuard from '@/hocs/authGuard'
import type { ReactElement } from 'react'
import type { NextPageWithLayout } from '../_app'

const Page: NextPageWithLayout = () => {
  return (
    <AuthGuard>
      <ListPost />
    </AuthGuard>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
