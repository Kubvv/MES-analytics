import React from 'react'
import './App.css'

import { Box } from '@mui/material'
import ElectionAnalytics from './pages/ElectionAnalytics'

function App (): JSX.Element {
  return (
    <Box
      sx={{
        width: '100vw',
        maxWidth: '100%',
        minHeight: '100vh',
        overflowX: 'hidden',
        backgroundColor: '#e3e3e3'
      }}
    >
      <ElectionAnalytics />
    </Box>
  )
}

export default App
