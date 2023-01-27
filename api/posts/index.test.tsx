import { QueryClientProvider } from '@tanstack/react-query'
import type { UseQueryResult, UseMutationResult } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import axios from 'axios'
import type { AxiosError } from 'axios'
import MockAdapter from 'axios-mock-adapter'

import type { Post } from 'types'
import { queryClient } from 'utils/test'

import type { CreatePostParams } from './index'
import { useGetPosts, useGetPost, useCreatePost } from './index'
import mockPostData from './mockData/post.json'
import mockPostsData from './mockData/posts.json'

const mockAxios = new MockAdapter(axios)

describe('[API] Posts', () => {
  describe('useGetPosts', () => {
    it('success', async () => {
      mockAxios.onGet('/posts').reply(200, mockPostsData)
      const wrapper = ({ children }: { children: JSX.Element }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      )
      let result:
        | {
            current: UseQueryResult<ReadonlyArray<Post>, unknown>
          }
        | undefined

      await act(async () => {
        result = renderHook(() => useGetPosts(), {
          wrapper,
        }).result
      })

      await waitFor(() => {
        expect(result?.current.isSuccess).toBe(true)
      })

      expect(result?.current.data).toEqual(mockPostsData)
    })

    it('fail', async () => {
      mockAxios.onGet('/posts').reply(400)
      const wrapper = ({ children }: { children: JSX.Element }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      )
      let result:
        | {
            current: UseQueryResult<ReadonlyArray<Post>, unknown>
          }
        | undefined

      await act(async () => {
        result = renderHook(() => useGetPosts(), {
          wrapper,
        }).result
      })

      await waitFor(() => {
        expect(result?.current.isError).toBe(true)
      })

      expect((result?.current.error as AxiosError).response?.status).toBe(400)
    })
  })

  describe('useGetPost', () => {
    it('success', async () => {
      mockAxios.onGet('/posts/1').reply(200, mockPostData)
      const wrapper = ({ children }: { children: JSX.Element }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      )
      let result:
        | {
            current: UseQueryResult<Post, unknown>
          }
        | undefined

      await act(async () => {
        result = renderHook(() => useGetPost({ id: '1' }), {
          wrapper,
        }).result
      })

      await waitFor(() => {
        expect(result?.current.isSuccess).toBe(true)
      })

      expect(result?.current.data).toEqual(mockPostData)
    })

    it('fail', async () => {
      mockAxios.onGet('/posts/1').reply(400)
      const wrapper = ({ children }: { children: JSX.Element }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      )
      let result:
        | {
            current: UseQueryResult<Post, unknown>
          }
        | undefined

      await act(async () => {
        result = renderHook(() => useGetPost({ id: '1' }), {
          wrapper,
        }).result
      })

      await waitFor(() => {
        expect(result?.current.isError).toBe(true)
      })

      expect((result?.current.error as AxiosError).response?.status).toBe(400)
    })

    it('idle with no ID', async () => {
      const wrapper = ({ children }: { children: JSX.Element }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      )
      let result:
        | {
            current: UseQueryResult<Post, unknown>
          }
        | undefined

      await act(async () => {
        result = renderHook(() => useGetPost({ id: undefined }), {
          wrapper,
        }).result
      })

      expect(result?.current.fetchStatus).toBe('idle')
    })

    it('idle with wrong ID', async () => {
      const wrapper = ({ children }: { children: JSX.Element }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      )
      let result:
        | {
            current: UseQueryResult<Post, unknown>
          }
        | undefined

      await act(async () => {
        result = renderHook(() => useGetPost({ id: 'abcd' }), {
          wrapper,
        }).result
      })

      expect(result?.current.fetchStatus).toBe('idle')
    })

    it('idle with ID list', async () => {
      const wrapper = ({ children }: { children: JSX.Element }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      )
      let result:
        | {
            current: UseQueryResult<Post, unknown>
          }
        | undefined

      await act(async () => {
        result = renderHook(() => useGetPost({ id: ['1', '2', '3'] }), {
          wrapper,
        }).result
      })

      expect(result?.current.fetchStatus).toBe('idle')
    })
  })

  describe('useCreatePost', () => {
    it('success', async () => {
      mockAxios.onPost('/posts').reply(200, mockPostData)
      const wrapper = ({ children }: { children: JSX.Element }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      )

      let data, error
      let result: {
        current: UseMutationResult<
          Post,
          AxiosError<unknown, unknown>,
          CreatePostParams,
          unknown
        >
      }

      await act(async () => {
        result = renderHook(
          () =>
            useCreatePost({
              onSuccess: (apiData) => (data = apiData),
              onError: (apiError) => (error = apiError),
            }),
          { wrapper },
        ).result
      })

      await act(async () => {
        await result.current.mutate({
          userId: 1,
          title: 'test title',
          description: 'test description',
        })
      })

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true)
      })

      expect(data).toEqual(mockPostData)
      expect(error).toBe(undefined)
    })

    it('fail', async () => {
      mockAxios.onPost('/posts').reply(400)
      const wrapper = ({ children }: { children: JSX.Element }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      )
      let data
      let error: AxiosError | undefined
      let result: {
        current: UseMutationResult<
          Post,
          AxiosError<unknown, unknown>,
          CreatePostParams,
          unknown
        >
      }
      await act(async () => {
        result = renderHook(
          () =>
            useCreatePost({
              onSuccess: (apiData) => (data = apiData),
              onError: (apiError) => (error = apiError),
            }),
          { wrapper },
        ).result
      })

      await act(async () => {
        result.current.mutate({
          userId: 1,
          title: 'test title',
          description: 'test description',
        })
      })

      await waitFor(() => {
        expect(result.current.isError).toBe(true)
      })

      expect(data).toEqual(undefined)
      expect(error?.response?.status).toBe(400)
    })
  })
})
