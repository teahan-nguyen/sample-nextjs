import React from 'react'

import { PostDetailProps } from './types'
import usePostByID from '@/hooks/react-query/posts/usePostByID'

const PostDetail = ({ id }: PostDetailProps) => {
  const {} = usePostByID(id)
  return <div className=" ">{id}</div>
}

export default PostDetail
