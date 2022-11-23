import { QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'

import mockPostData from 'api/posts/mockData/post.json'
import type { Post } from 'types'
import {
  queryClient,
  mockBlogDetail,
  useRouter,
  getMockRouter,
} from 'utils/test'

import PostDetail from '../../pages/posts/[id]'

let mockResponse: { readonly data: Post | undefined } = {
  data: undefined,
}
jest.mock('api/posts', () => ({
  useGetPost: ({ id }: { readonly id: string | undefined }) =>
    typeof id === 'string' && !isNaN(Number.parseInt(id))
      ? mockResponse
      : { data: undefined },
}))

describe('PostDetail', () => {
  beforeEach(() => {
    const mockRouter = getMockRouter('/posts/1')
    mockRouter.query = {
      id: '1',
    }
    useRouter.mockImplementation(() => mockRouter)
  })

  it('rendered well with data', () => {
    mockResponse = { data: mockPostData }

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <PostDetail />
      </QueryClientProvider>,
    )

    expect(mockBlogDetail.mock.calls.length).toBe(1)
    expect(mockBlogDetail.mock.calls[0][0].post).toBe(mockPostData)

    expect(container).toMatchSnapshot()
  })

  it('rendered well without data', () => {
    mockResponse = { data: undefined }

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <PostDetail />
      </QueryClientProvider>,
    )

    expect(mockBlogDetail.mock.calls.length).toBe(1)
    expect(mockBlogDetail.mock.calls[0][0].post).toBe(undefined)

    expect(container).toMatchSnapshot()
  })

  it('rendered well with wrong ID query', () => {
    const mockRouter = getMockRouter('/posts/aaa')
    mockRouter.query = {
      id: 'aaa',
    }
    useRouter.mockImplementation(() => mockRouter)
    mockResponse = { data: mockPostData }

    render(
      <QueryClientProvider client={queryClient}>
        <PostDetail />
      </QueryClientProvider>,
    )

    expect(mockBlogDetail.mock.calls.length).toBe(1)
    expect(mockBlogDetail.mock.calls[0][0].post).toBe(undefined)
  })
})
