import { render, screen, fireEvent } from '@testing-library/react'
import { SampleButton } from './index'

const mockButton = jest.fn()

jest.mock('@mui/material', () => {
  const { Button, ...rest } = jest.requireActual('@mui/material')

  const MockButton = (props: unknown) => {
    mockButton(props)
    return <Button {...props} />
  }

  return {
    Button: MockButton,
    ...rest,
  }
})

describe('<SampleButton />', () => {
  beforeEach(() => {
    mockButton.mockClear()
  })

  it('Primary', async () => {
    const { container } = render(
      <SampleButton color="primary" label="Button" />,
    )

    expect(mockButton.mock.calls[0][0].variant).toBe('contained')
    expect(mockButton.mock.calls[0][0].color).toBe('primary')
    expect(mockButton.mock.calls[0][0].size).toBe('medium')
    expect(mockButton.mock.calls[0][0].backgroundColor).toBe(undefined)
    expect(mockButton.mock.calls[0][0].children).toBe('Button')

    expect(container).toMatchSnapshot()
  })

  it('backgroundColor', async () => {
    render(<SampleButton backgroundColor="red" label="Button" />)
    expect(screen.getByText('Button')).toHaveStyle('background-color: red')
  })

  it('size', async () => {
    const { rerender } = render(<SampleButton size="small" label="Button" />)
    expect(mockButton.mock.calls[0][0].size).toBe('small')

    rerender(<SampleButton size="medium" label="Button" />)
    expect(mockButton.mock.calls[1][0].size).toBe('medium')

    rerender(<SampleButton size="large" label="Button" />)
    expect(mockButton.mock.calls[2][0].size).toBe('large')
  })

  it('label', async () => {
    const { rerender } = render(<SampleButton label="Button" />)
    expect(screen.queryByText('Button')).toBeInTheDocument()
    expect(screen.queryByText('Test Button')).not.toBeInTheDocument()

    rerender(<SampleButton label="Test Button" />)
    expect(screen.queryByText('Button')).not.toBeInTheDocument()
    expect(screen.queryByText('Test Button')).toBeInTheDocument()
  })

  it('onClick', async () => {
    const onClick = jest.fn()
    render(<SampleButton label="Button" onClick={onClick} />)

    expect(onClick).not.toHaveBeenCalled()
    fireEvent.click(screen.getByText('Button'))
    expect(onClick).toHaveBeenCalled()
  })
})
