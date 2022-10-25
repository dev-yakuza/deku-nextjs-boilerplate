import AddIcon from '@mui/icons-material/Add'
import { Grid } from '@mui/material'

import { FloatingActionLink } from 'components/atoms'
import { BlogItem } from 'components/organisms'
import type { Post } from 'types'

interface Props {
  readonly posts?: ReadonlyArray<Post>
}

const BlogList = ({ posts = [] }: Props) => {
  return (
    <Grid container>
      {posts.map((blog) => (
        <BlogItem
          key={blog.id}
          id={blog.id}
          title={blog.title}
          body={blog.body}
        />
      ))}
      <FloatingActionLink link="/posts/add">
        <AddIcon />
      </FloatingActionLink>
    </Grid>
  )
}

export { BlogList }
