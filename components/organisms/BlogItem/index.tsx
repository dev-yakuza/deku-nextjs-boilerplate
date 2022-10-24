import { Grid, Typography } from '@mui/material'
import { styled } from '@mui/system'
import Link from 'next/link'

const Container = styled(Grid)`
  background-color: #fff;
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 10px 10px 30px #d9d9d9, -10px -10px 30px #fff;
`

export interface Props {
  readonly id: number
  readonly title: string
  readonly contents: string
}

export const BlogItem = ({ id, title, contents }: Props) => {
  return (
    <Container item xs={12}>
      <Link href={`/posts/${id}`}>
        <a>
          <Typography>{title}</Typography>
          <Typography>{contents}</Typography>
        </a>
      </Link>
    </Container>
  )
}
