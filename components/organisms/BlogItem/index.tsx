import styled from '@emotion/styled'
import { Grid, Typography } from '@mui/material'

const Container = styled(Grid)`
  background-color: #fff;
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
  box-shadow: 10px 10px 30px #d9d9d9, -10px -10px 30px #fff;
`

interface Props {
  readonly title: string
  readonly contents: string
}

export const BlogItem = ({ title, contents }: Props) => {
  return (
    <Container item xs={12}>
      <Typography>{title}</Typography>
      <Typography>{contents}</Typography>
    </Container>
  )
}
