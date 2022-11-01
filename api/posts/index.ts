import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import type { Post } from 'types'

const POSTS_URL = `${process.env.NEXT_PUBLIC_API_SERVER}/posts`

const getPosts = async (): Promise<ReadonlyArray<Post>> => {
  const response = await axios.get(POSTS_URL)

  return response.data
}

export const useGetPosts = () => {
  return useQuery(['GetPosts'], () => getPosts(), {
    refetchOnWindowFocus: false,
  })
}

interface GetPostParams {
  readonly id: number
}
const getPost = async ({ id }: GetPostParams): Promise<ReadonlyArray<Post>> => {
  const response = await axios.get(`${POSTS_URL}/${id}`)

  return response.data
}

export const useGetPost = ({ id }: GetPostParams) => {
  return useQuery(['GetPost', id], () => getPost({ id }), {
    refetchOnWindowFocus: false,
  })
}
