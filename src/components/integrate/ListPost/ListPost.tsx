import Button from '@/components/build/Button'
import Table from '@/components/build/Table'
import { APP_ROUTES } from '@/constants'
import useListPost from '@/hooks/react-query/posts/useListPost'
import { Post } from '@/hooks/react-query/posts/useListPost/useListPost'
import Link from 'next/link'
import { ListPostProps } from './types'

const ListPost = ({}: ListPostProps) => {
  const { data, isLoading, error } = useListPost({})

  if (isLoading) {
    return 'Loading...'
  }

  if (error) {
    return 'Error'
  }

  return (
    <div className="max-w-[1000px] mx-auto">
      <div className="flex justify-end py-4 ">
        <Link href={APP_ROUTES.posts.create}>
          <Button>Create</Button>
        </Link>
      </div>
      <Table<Post>
        bodyColumns={[
          {
            renderKey: 'title',
          },
          {
            renderKey: 'description',
          },
        ]}
        dataSource={data?.docs || []}
        headerColumns={[
          {
            isSort: false,
            text: 'Title',
          },
          {
            isSort: false,
            text: 'Description',
          },
        ]}
        idKey="id"
        isLoading={isLoading}
        // onRowClick={(id) => {
        //   router.push(APP_ROUTES.posts.detail(id))
        // }}
      />
    </div>
  )
}

export default ListPost
