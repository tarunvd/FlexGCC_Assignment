import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CssBaseline, Stack, ThemeProvider } from '@mui/material'
import { BrowserRouter as Router } from 'react-router';
import { theme } from './styles/theme.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Stack height="100dvh" width="100dvw">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
            <App />
        </ThemeProvider>
      </Router>
    </Stack>
  </StrictMode>,
)
