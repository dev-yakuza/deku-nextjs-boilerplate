import type { NextPage } from 'next'

import { useGetPosts } from 'api/posts'
import { PageLoading } from 'components/atoms'
import { BlogList } from 'components/templates'

const BlogListPage: NextPage = () => {
  const { isLoading, data } = useGetPosts()

  if (isLoading) {
    return <PageLoading />
  }

  return <BlogList posts={data} />
}

export default BlogListPage
