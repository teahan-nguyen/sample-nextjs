import { API_ROUTES, REACT_QUERY_KEYS } from '@/constants'
import useApiClient from '@/hooks/useApiClient'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

interface CreatePostParams {
  title: string
  description: string
}

export default function useCreatePost({ onSuccess }: { onSuccess: () => any }) {
  const apiClient = useApiClient()
  const q = useQueryClient()

  return useMutation({
    mutationKey: ['create post'],
    mutationFn: async function (params: CreatePostParams) {
      return await apiClient.post(API_ROUTES.posts.create, params)
    },
    onSuccess() {
      q.invalidateQueries({ queryKey: [REACT_QUERY_KEYS.posts.list] })
      toast.success('Create post successfully.')
      onSuccess()
    },
  })
}
