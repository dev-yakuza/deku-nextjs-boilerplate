import { AppBar, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'

export const Header = () => {
  return (
    <AppBar position="fixed" elevation={4} style={{ backgroundColor: '#FFF' }}>
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <Link href="/">
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Blog App
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  )
}
