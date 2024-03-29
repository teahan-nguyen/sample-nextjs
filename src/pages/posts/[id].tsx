import type { ReactElement } from 'react'
import Layout from '@/components/combine/Layout'
import { NextPageWithLayout } from '@/pages/_app'
import { useRouter } from 'next/router'
import PostDetail from '@/components/integrate/PostDetail'

const Page: NextPageWithLayout = () => {
  const router = useRouter()

  const id = router?.query?.id || ''

  return (
    <div className=" ">
      <PostDetail id={id as string} />
    </div>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
