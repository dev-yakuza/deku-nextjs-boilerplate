import { act, fireEvent, render, screen } from '@testing-library/react'
import { RecoilRoot, useSetRecoilState } from 'recoil'

import { errorMessageState } from 'data/ErrorMessage'
import { mockSnackbar } from 'utils/test'

import { ErrorMessage } from '.'

jest.useFakeTimers()

describe('<ErrorMessage />', () => {
  it('Rendered well', async () => {
    const TestComponent = () => {
      const setErrorMessage = useSetRecoilState(errorMessageState)

      return (
        <>
          <ErrorMessage />
          <button
            onClick={() => setErrorMessage('This is a test error message')}
          >
            Show
          </button>
        </>
      )
    }

    const { container } = render(
      <RecoilRoot>
        <TestComponent />
      </RecoilRoot>,
    )

    let snackbar = mockSnackbar.mock.calls[0][0]
    expect(snackbar.open).toBe(false)
    expect(snackbar.autoHideDuration).toBe(3000)
    expect(snackbar.onClose.name).toBe('handleClose')
    expect(snackbar.anchorOrigin).toEqual({
      vertical: 'bottom',
      horizontal: 'center',
    })

    let alert = snackbar.children
    expect(alert.type.render.name).toBe('Alert')
    expect(alert.props.onClose.name).toBe('handleClose')
    expect(alert.props.severity).toBe('error')
    expect(alert.props.sx).toEqual({ width: '100%' })
    expect(alert.props.children).toBe(undefined)

    mockSnackbar.mockClear()
    fireEvent.click(screen.getByText('Show'))

    snackbar = mockSnackbar.mock.calls[1][0]
    expect(snackbar.open).toBe(true)
    alert = snackbar.children
    expect(alert.props.children).toBe('This is a test error message')

    mockSnackbar.mockClear()
    act(() => {
      jest.runOnlyPendingTimers()
    })

    snackbar = mockSnackbar.mock.calls[0][0]
    expect(snackbar.open).toBe(false)
    alert = snackbar.children
    expect(alert.props.children).toBe('This is a test error message')

    mockSnackbar.mockClear()
    act(() => {
      jest.runOnlyPendingTimers()
    })

    snackbar = mockSnackbar.mock.calls[0][0]
    expect(snackbar.open).toBe(false)
    alert = snackbar.children
    expect(alert.props.children).toBe(undefined)

    expect(container).toMatchSnapshot()
  })
})
