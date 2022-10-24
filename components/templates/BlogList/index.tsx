import AddIcon from '@mui/icons-material/Add'
import { Grid } from '@mui/material'

import { FloatingActionLink } from 'components/atoms'
import { BlogItem } from 'components/organisms'
import type { Props as Post } from 'components/organisms/BlogItem'

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
          contents={blog.contents}
        />
      ))}
      <FloatingActionLink link="/posts/add">
        <AddIcon />
      </FloatingActionLink>
    </Grid>
  )
}

export { BlogList }
