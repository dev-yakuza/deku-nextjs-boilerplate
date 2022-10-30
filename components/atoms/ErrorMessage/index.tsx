import { useEffect, useState } from 'react'

import { Alert, Snackbar } from '@mui/material'
import { useRecoilState } from 'recoil'

import { errorMessageState } from 'data/ErrorMessage'

export const ErrorMessage = () => {
  const [open, setOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useRecoilState(errorMessageState)

  const handleClose = () => {
    setOpen(false)
    setTimeout(() => setErrorMessage(undefined), 100)
  }

  useEffect(() => {
    if (errorMessage !== undefined && errorMessage !== '') {
      setOpen(true)
    }
  }, [errorMessage])

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {errorMessage}
      </Alert>
    </Snackbar>
  )
}
