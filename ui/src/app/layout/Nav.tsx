import { AppBar, Badge, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material"
import { Link, NavLink } from "react-router-dom";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { Box } from "@mui/system";
import { useReactronicsContext } from "../context/ReactronicsContext";
import { CartItem } from "../models/cart";

interface Props {
  isDarkMode: boolean
  onModeChange: () => void
}

interface To {
  key: string,
  path: string
}

const navStyles = {
  color: 'inherit',
  textDecoration: 'none',
  typography: 'h6',
  '&.active': {
    color: 'text.secondary'
  },
  '&:hover': {
    color: 'text.secondary'
  }
}

function links(links: To[]) {
  const items = links.map(({ key, path }) =>
    <ListItem
      key={key}
      component={NavLink}
      to={path}
      sx={navStyles}
    >
      {key.toUpperCase()}
    </ListItem>
  )

  return <List sx={{ display: 'flex' }}>{items}</List>
}

const nav = {
  app() {
    return links([
      {
        key: 'catalog',
        path: '/catalog'
      },
      {
        key: 'about',
        path: '/about'
      },
      {
        key: 'contact',
        path: '/contact'
      }
    ])
  },
  auth() {
    return links([
      {
        key: 'signin',
        path: '/signin'
      },
      {
        key: 'signup',
        path: '/signup'
      }
    ])
  }
}

const Nav = ({ isDarkMode, onModeChange }: Props) => {

  const { cart } = useReactronicsContext();

  const quantity = cart?.items.reduce((count, i) => count + i.quantity, 0)

  return <AppBar
    position='static'
    sx={{ mb: 4 }}
  >
    <Toolbar sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Box display='flex' alignItems='center'>
        <Typography
          exact
          component={NavLink}
          to='/'
          sx={navStyles}
        >
          REACTronics
        </Typography>
        <Switch
          checked={isDarkMode}
          onChange={onModeChange}
        />
      </Box>
      {nav.app()}
      <Box
        display='flex'
        alignItems='center'
      >
        <IconButton
          component={Link}
          to='/cart'
          sx={{ color: 'inherit' }}
        >
          <Badge badgeContent={quantity}>
            <ShoppingBasketIcon />
          </Badge>
        </IconButton>
        {nav.auth()}
      </Box>
    </Toolbar>
  </AppBar>
}

export default Nav