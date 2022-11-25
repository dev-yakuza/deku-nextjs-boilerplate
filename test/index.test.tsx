import { QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'

import mockPostsData from 'api/posts/mockData/posts.json'
import type { Post } from 'types'
import { queryClient, mockBlogList, mockPageLoading } from 'utils/test'

import BlogListPage from '../pages/index'

let mockResponse = {
  data: [] as readonly Post[],
  isLoading: true,
}
jest.mock('api/posts', () => ({ useGetPosts: () => mockResponse }))

describe('<BlogListPage />', () => {
  it('rendered well with data', () => {
    mockResponse = { data: mockPostsData, isLoading: false }

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <BlogListPage />
      </QueryClientProvider>,
    )

    expect(mockBlogList.mock.calls.length).toBe(1)
    expect(mockBlogList.mock.calls[0][0].posts).toBe(mockPostsData)

    expect(container).toMatchSnapshot()
  })

  it('show loading when data is loading', () => {
    mockResponse = { data: [], isLoading: true }

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <BlogListPage />
      </QueryClientProvider>,
    )

    expect(mockPageLoading.mock.calls.length).toBe(1)

    expect(container).toMatchSnapshot()
  })
})
