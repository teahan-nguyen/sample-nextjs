import Layout from '@/components/combine/Layout'
import CreatePostPage from '@/components/integrate/CreatePostPage'
import AuthGuard from '@/hocs/authGuard'
import { type ReactElement } from 'react'
import type { NextPageWithLayout } from '../_app'

const Page: NextPageWithLayout = () => {
  return (
    <AuthGuard>
      <CreatePostPage />
    </AuthGuard>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
