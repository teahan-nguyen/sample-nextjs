import type { ReactElement } from 'react'

import Layout from '@/components/combine/Layout'
import type { NextPageWithLayout } from './_app'

const Page: NextPageWithLayout = () => {
  return <div className=" "></div>
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
