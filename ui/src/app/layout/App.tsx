import './styles.css'
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Catalog from '../../features/catalog/Catalog';
import Nav from './Nav';
import { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import About from '../../features/about/About';
import ProductDetails from '../../features/catalog/ProductDetails';
import Contact from '../../features/contact/Contact';
import Home from '../../features/home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import ShoppingCart from '../../features/cart/ShoppingCart';
import { useReactronicsContext } from '../context/ReactronicsContext';
import { cookies } from './../util/index';
import api from './../api/index';
import Loader from './Loader';

const App = () => {

  const { setCart } = useReactronicsContext()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const id = cookies('customerId')
    if (id) {
      api.cart
        .get()
        .then(setCart)
        .catch(console.log)
        .finally(() => setLoading(false))
    } else setLoading(false)
  }, [setCart])

  const [darkMode, setMode] = useState(false)

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light'
    }
  })

  const onModeChange = () => {
    setMode(!darkMode)
  }

  if (loading) return <Loader />

  return <ThemeProvider theme={theme}>
    <ToastContainer position='bottom-right' />
    <CssBaseline />
    <Nav
      isDarkMode={darkMode}
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
