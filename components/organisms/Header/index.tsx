import { AppBar, Toolbar, Typography } from '@mui/material'

export const Header = () => {
  return (
    <AppBar position="static" elevation={0} style={{ backgroundColor: '#FFF' }}>
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Blog App
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
