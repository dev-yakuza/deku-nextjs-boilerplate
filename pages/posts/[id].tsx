import { useRouter } from 'next/router'

import { useGetPost } from 'api/posts'
import { BlogDetail } from 'components/templates'

import type { NextPage } from 'next'

const PostDetailPage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { data } = useGetPost({ id })

  return <BlogDetail post={data} />
}

export default PostDetailPage
