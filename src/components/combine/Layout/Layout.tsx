import React from 'react'

import { LayoutProps } from './types'
import Header from '../Header'

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="">
      <Header />
      {children}
    </div>
  )
}

export default Layout
