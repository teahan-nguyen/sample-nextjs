import { API_ROUTES, REACT_QUERY_KEYS } from '@/constants'
import useApiClient from '@/hooks/useApiClient'
import { useQuery } from '@tanstack/react-query'
import { Post } from '../useListPost/useListPost'

export default function usePostByID(id: string) {
  const apiClient = useApiClient()

  return useQuery({
    queryKey: [REACT_QUERY_KEYS.posts.detail, id],
    queryFn: async () => {
      const { data } = await apiClient!.get(API_ROUTES.posts.detail(id))
      return data as Post
    },
    enabled: !!apiClient,
  })
}
