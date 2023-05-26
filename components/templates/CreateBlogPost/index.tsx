import { useState } from 'react'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import { useRouter } from 'next/router'

const Container = styled(Grid)`
  background-color: #fff;
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 10px 10px 30px #d9d9d9, -10px -10px 30px #fff;
`

interface Props {
  readonly isCreating?: boolean
  readonly onCreatePost?: (title: string, description: string) => void
}

const CreateBlogPost = ({ isCreating, onCreatePost }: Props) => {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState('')
  const [description, setDescription] = useState('')
  const [descriptionError, setDescriptionError] = useState('')

  const handleBack = () => {
    router.push('/')
  }

  const handleCreate = () => {
    if (title === '') {
      setTitleError('Please input the post title.')
    }
    if (description === '') {
      setDescriptionError('Please input the post description.')
    }
    if (title === '' || description === '') return
    if (typeof onCreatePost === 'function') onCreatePost(title, description)
  }

  const handleChangeTitle = (value: string) => {
    if (titleError !== '') setTitleError('')
    setTitle(value)
  }

  const handleChangeDescription = (value: string) => {
    if (descriptionError !== '') setDescriptionError('')
    setDescription(value)
  }

  return (
    <>
      <Toolbar />
      <Grid container>
        <Container item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              size="small"
              color="inherit"
              startIcon={<ArrowBackIosNewIcon />}
              style={{ marginBottom: 16 }}
              onClick={handleBack}
            >
              Posts
            </Button>
            <Button
              size="small"
              variant="contained"
              style={{ marginBottom: 16 }}
              disabled={isCreating}
              onClick={handleCreate}
            >
              {isCreating ? <CircularProgress size="1rem" /> : 'Create'}
            </Button>
          </Box>
          <Box>
            <Typography sx={{ marginRight: '10px' }}>Title:</Typography>
            <TextField
              size="small"
              fullWidth
              value={title}
              error={Boolean(titleError)}
              helperText={titleError}
              sx={{
                marginBottom: Boolean(titleError) ? 0 : '24px',
              }}
              onChange={(e) => handleChangeTitle(e.target.value)}
            />
          </Box>
          <Box>
            <Typography sx={{ marginRight: '10px' }}>Description:</Typography>
            <TextField
              fullWidth
              multiline
              minRows={10}
              value={description}
              error={Boolean(descriptionError)}
              helperText={descriptionError}
              sx={{
                marginBottom: Boolean(descriptionError) ? 0 : '24px',
              }}
              onChange={(e) => handleChangeDescription(e.target.value)}
            />
          </Box>
        </Container>
      </Grid>
    </>
  )
}

export { CreateBlogPost }
