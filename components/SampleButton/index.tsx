import { Button } from '@mui/material'
import type { ButtonProps } from '@mui/material'
import styled from '@emotion/styled'

const StyledButton = styled(
  ({
    backgroundColor,
    ...props
  }: Pick<Props, 'backgroundColor'> & ButtonProps) => <Button {...props} />,
)`
  ${(props) =>
    props.backgroundColor ? `background-color: ${props.backgroundColor};` : ''}
`

interface Props {
  readonly color?: 'primary' | 'secondary' | undefined
  readonly backgroundColor?: string
  readonly size?: 'small' | 'medium' | 'large'
  readonly label: string
  readonly onClick?: () => void
}

export const SampleButton = ({
  color = 'primary',
  size = 'medium',
  backgroundColor,
  label,
  onClick,
}: Props) => {
  return (
    <StyledButton
      variant="contained"
      color={color}
      size={size}
      backgroundColor={backgroundColor}
      onClick={onClick}
    >
      {label}
    </StyledButton>
  )
}
