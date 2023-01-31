const mockAppBar = jest.fn()
const mockToolbar = jest.fn()
const mockTypography = jest.fn()
const mockGrid = jest.fn()
const mockSnackbar = jest.fn()
const mockTextField = jest.fn()

jest.mock('@mui/material', () => {
  const {
    AppBar: MUIAppBar,
    Toolbar: MUIToolbar,
    Typography: MUITypography,
    Grid: MUIGrid,
    Snackbar: MUISnackbar,
    TextField: MUITextField,
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

  const Grid = (props: typeof MUIGrid) => {
    mockGrid(props)
    return <MUIGrid {...props} />
  }

  const Snackbar = (props: typeof MUISnackbar) => {
    mockSnackbar(props)
    return <MUISnackbar {...props} />
  }

  const TextField = (props: typeof MUITextField) => {
    mockTextField(props)
    return <MUITextField {...props} />
  }

  return {
    AppBar,
    Toolbar,
    Typography,
    Grid,
    Snackbar,
    TextField,
    ...rest,
  }
})

export {
  mockAppBar,
  mockToolbar,
  mockTypography,
  mockGrid,
  mockSnackbar,
  mockTextField,
}
