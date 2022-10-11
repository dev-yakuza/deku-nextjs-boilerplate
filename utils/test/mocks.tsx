const mockAppBar = jest.fn()
const mockToolbar = jest.fn()
const mockTypography = jest.fn()

jest.mock('@mui/material', () => {
  const {
    AppBar: MUIAppBar,
    Toolbar: MUIToolbar,
    Typography: MUITypography,
    ...rest
  } = jest.requireActual('@mui/material')

  const AppBar = (props: typeof MUIAppBar) => {
    mockAppBar(props)
    return <MUIAppBar {...props} />
  }

  const Toolbar = (props: typeof MUIToolbar) => {
    mockToolbar(props)
    return <MUIToolbar {...props} />
  }

  const Typography = (props: typeof MUITypography) => {
    mockTypography(props)
    return <MUITypography {...props} />
  }

  return {
    AppBar,
    Toolbar,
    Typography,
    ...rest,
  }
})

export { mockAppBar, mockToolbar, mockTypography }
