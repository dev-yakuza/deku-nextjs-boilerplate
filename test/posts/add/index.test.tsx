import { QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { AxiosError } from 'axios'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import type { NextRouter } from 'next/router'

import type { CreatePostParams } from 'api/posts'
import type { Post } from 'types'
import { queryClient, mockCreateBlogPost, getMockRouter } from 'utils/test'

import CreateBlogPost from '../../../pages/posts/add'

let mockAPISuccess = true
let mockIsLoading = false
let mockIsCalledOnSuccess = false
let mockIsCalledOnError = false
jest.mock('api/posts', () => ({
  useCreatePost: ({
    onSuccess,
    onError,
  }: {
    readonly onSuccess?: (data: Post) => void
    readonly onError?: (error: AxiosError) => void
  }) => ({
    mutate: ({ userId, title, description }: CreatePostParams) => {
      if (mockAPISuccess) {
        if (onSuccess != null) {
          mockIsCalledOnSuccess = true
          onSuccess({
            userId,
            id: 1,
            title,
            body: description,
          })
        }
      } else {
        if (onError != null) {
          mockIsCalledOnError = true
          onError(new AxiosError('Error'))
        }
      }
    },
    isLoading: mockIsLoading,
  }),
}))

describe('<CreateBlogPost />', () => {
  let mockRouter: NextRouter

  beforeEach(() => {
    mockAPISuccess = true
    mockIsLoading = false
    mockIsCalledOnSuccess = false
    mockIsCalledOnError = false

    mockRouter = getMockRouter()
  })

  it('rendered well', () => {
    const { container } = render(
      <RouterContext.Provider value={mockRouter}>
        <QueryClientProvider client={queryClient}>
          <CreateBlogPost />
        </QueryClientProvider>
      </RouterContext.Provider>,
    )

    expect(mockCreateBlogPost.mock.calls.length).toBe(1)
    expect(mockCreateBlogPost.mock.calls[0][0].isCreating).toBe(false)
    expect(mockCreateBlogPost.mock.calls[0][0].onCreatePost.name).toBe(
      'handleCreate',
    )

    expect(container).toMatchSnapshot()
  })

  it('rendered well with isLoading', () => {
    mockIsLoading = true

    render(
      <RouterContext.Provider value={mockRouter}>
        <QueryClientProvider client={queryClient}>
          <CreateBlogPost />
        </QueryClientProvider>
      </RouterContext.Provider>,
    )

    expect(mockCreateBlogPost.mock.calls[0][0].isCreating).toBe(true)
  })

  it('success to create post', () => {
    mockAPISuccess = true
    const routerPush = jest.fn()
    mockRouter.push = routerPush

    render(
      <RouterContext.Provider value={mockRouter}>
        <QueryClientProvider client={queryClient}>
          <CreateBlogPost />
        </QueryClientProvider>
      </RouterContext.Provider>,
    )

    expect(mockIsCalledOnSuccess).toBe(false)
    expect(mockIsCalledOnError).toBe(false)
    expect(routerPush.mock.calls.length).toBe(0)

    // Call creating post
    mockCreateBlogPost.mock.calls[0][0].onCreatePost(
      'test title',
      'test description',
    )

    expect(mockIsCalledOnSuccess).toBe(true)
    expect(mockIsCalledOnError).toBe(false)
    expect(routerPush.mock.calls[0][0]).toBe('/')
  })

  it('fail to create post', () => {
    mockAPISuccess = false

    render(
      <RouterContext.Provider value={mockRouter}>
        <QueryClientProvider client={queryClient}>
          <CreateBlogPost />
        </QueryClientProvider>
      </RouterContext.Provider>,
    )

    expect(mockIsCalledOnSuccess).toBe(false)
    expect(mockIsCalledOnError).toBe(false)

    // Call creating post
    mockCreateBlogPost.mock.calls[0][0].onCreatePost(
      'test title',
      'test description',
    )

    expect(mockIsCalledOnSuccess).toBe(false)
    expect(mockIsCalledOnError).toBe(true)
  })
})
