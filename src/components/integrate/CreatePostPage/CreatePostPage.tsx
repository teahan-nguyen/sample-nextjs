import { useState } from 'react'

import { APP_ROUTES } from '@/constants'
import useCreatePost from '@/hooks/react-query/posts/useCreatePost'
import { Button, Input } from 'antd'
import { useRouter } from 'next/navigation'
import { CreatePostPageProps } from './types'

const CreatePostPage = ({}: CreatePostPageProps) => {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const { mutate: createPost, isPending } = useCreatePost({
    onSuccess() {
      router.push(APP_ROUTES.posts.list)
    },
  })
  return (
    <div className="w-[500px] mx-auto ">
      <div className="p-2 ">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="p-2 ">
        <Input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="p-2 ">
        <Button
          children="Submit"
          onClick={() => {
            createPost({ title, description })
          }}
          loading={isPending}
        />
      </div>
    </div>
  )
}

export default CreatePostPage
