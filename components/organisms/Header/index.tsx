import { AppBar, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'

export const Header = () => {
  return (
    <AppBar position="static" elevation={0} style={{ backgroundColor: '#FFF' }}>
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <Link href="/">
          <a>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Blog App
            </Typography>
          </a>
        </Link>
      </Toolbar>
    </AppBar>
  )
}
