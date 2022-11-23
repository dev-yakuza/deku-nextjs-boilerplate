import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useGetPost } from 'api/posts'
import { BlogDetail } from 'components/templates'

const PostDetail: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const postID = typeof id === 'string' ? Number.parseInt(id) : null
  const { data } = useGetPost({ id: postID })

  return <BlogDetail post={data} />
}

export default PostDetail
