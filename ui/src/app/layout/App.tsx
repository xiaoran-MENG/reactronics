import './styles.css'
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Catalog from '../../features/catalog/Catalog';
import Nav from './Nav';
import { useState } from 'react';
import { Route } from 'react-router-dom';
import About from '../../features/about/About';
import ProductDetails from '../../features/catalog/ProductDetails';
import Contact from '../../features/contact/Contact';
import Home from '../../features/home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import ShoppingCart from '../../features/cart/ShoppingCart';

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
    <ToastContainer position='bottom-right' />
    <CssBaseline />
    <Nav
      isDarkMode={isDarkMode}
      onModeChange={onModeChange}
    />
    <Container>
      <Route exact path='/' component={Home} />
      <Route exact path='/catalog' component={Catalog} />
      <Route path='/catalog/:id' component={ProductDetails} />
      <Route path='/about' component={About} />
      <Route path='/contact' component={Contact} />
      <Route path='/cart' component={ShoppingCart} />
    </Container>
  </ThemeProvider>
}

export default App
