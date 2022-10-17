import { Button } from '@mui/material'
import type { ButtonProps } from '@mui/material'
import { styled } from '@mui/system'

const StyledButton = styled(Button, {
  shouldForwardProp: (propName) => propName !== 'backgroundColor',
})<Pick<Props, 'backgroundColor'> & ButtonProps>`
  ${({ backgroundColor }) =>
    backgroundColor ? `background-color: ${backgroundColor};` : ''}
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
