import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import {
  Grid,
  Toolbar,
  Skeleton,
  Typography,
  Divider,
  Button,
} from '@mui/material'
import { styled } from '@mui/system'
import { useRouter } from 'next/router'

import type { Post } from 'types'

const Container = styled(Grid)`
  background-color: #fff;
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 10px 10px 30px #d9d9d9, -10px -10px 30px #fff;
`

interface Props {
  readonly post?: Post
}

const BlogDetail = ({ post }: Props) => {
  const router = useRouter()

  const handleBack = () => {
    router.push('/')
  }

  return (
    <>
      <Toolbar />
      <Grid container>
        <Container item xs={12}>
          <Button
            size="small"
            color="inherit"
            startIcon={<ArrowBackIosNewIcon />}
            style={{ marginBottom: 16 }}
            onClick={handleBack}
          >
            Posts
          </Button>
          <Typography
            variant="h1"
            style={{ margin: '0 16px', fontWeight: 600 }}
          >
            {post ? post.title : <Skeleton />}
          </Typography>
          <Divider style={{ margin: '16px 0' }} />
          <Typography style={{ margin: '0 8px' }}>
            {post ? (
              post.body
            ) : (
              <>
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </>
            )}
          </Typography>
        </Container>
      </Grid>
    </>
  )
}

export { BlogDetail }
