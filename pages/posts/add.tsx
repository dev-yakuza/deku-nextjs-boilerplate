import { useRouter } from 'next/router'

import { useCreatePost } from 'api/posts'
import { CreateBlogPost } from 'components/templates'

const CreatePost = () => {
  const router = useRouter()
  const { mutate: createPost, isLoading: isCreating } = useCreatePost({
    onSuccess: () => {
      router.push('/')
    },
    onError: () => {},
  })

  const handleCreate = (title: string, description: string) => {
    createPost({
      userId: 1,
      title,
      description,
    })
  }

  return <CreateBlogPost isCreating={isCreating} onCreatePost={handleCreate} />
}

export default CreatePost
