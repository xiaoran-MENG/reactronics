import './styles.css'
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Catalog from '../../features/catalog/Catalog';
import Nav from './Nav';
import { useState } from 'react';

const App = () => {

  const [isDarkMode, setMode] = useState(false)

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light'
    }
  })

  const onModeChange = () => {
    setMode(!isDarkMode)
  }

  return <ThemeProvider theme={theme}>
    <CssBaseline />
    <Nav
      isDarkMode={isDarkMode}
      onModeChange={onModeChange} 
    />
    <Container>
      <Catalog />
    </Container>
  </ThemeProvider>
}

export default App
