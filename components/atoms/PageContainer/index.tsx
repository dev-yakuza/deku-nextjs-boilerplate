import { Box } from '@mui/material'
import { styled } from '@mui/system'

const Container = styled(Box)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #eee;
  overflow: scroll;
`

interface Props {
  readonly children: React.ReactNode
}

export const PageContainer = ({ children }: Props) => {
  return <Container>{children}</Container>
}
