import { QueryClientProvider } from '@tanstack/react-query'
import type { UseQueryResult } from '@tanstack/react-query'
import { act, renderHook, waitFor } from '@testing-library/react'
import axios from 'axios'
import type { AxiosError } from 'axios'
import MockAdapter from 'axios-mock-adapter'

import type { Post } from 'types'
import { queryClient } from 'utils/test'

import { useGetPosts } from './index'
import mockPosts from './mockData/posts.json'

const mockAxios = new MockAdapter(axios)

describe('[API] useGetPosts', () => {
  it('success', async () => {
    mockAxios.onGet('/posts').reply(200, mockPosts)
    const wrapper = ({ children }: { children: JSX.Element }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
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

    expect(result?.current.data).toEqual(mockPosts)
  })

  it('fail', async () => {
    mockAxios.onGet('/posts').reply(400)
    const wrapper = ({ children }: { children: JSX.Element }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
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
