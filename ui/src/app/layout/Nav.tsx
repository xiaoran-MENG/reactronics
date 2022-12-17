import { AppBar, Switch, Toolbar, Typography } from "@mui/material"

interface Props {
    isDarkMode: boolean
    onModeChange: () => void
}

const Nav = ({ isDarkMode, onModeChange }: Props) => {
  return <AppBar position='static' sx={{mb: 4}}>
    <Toolbar>
        <Switch 
            checked={isDarkMode}
            onChange={onModeChange}
        />
        <Typography variant='h4'>
            Reactronics
        </Typography>
    </Toolbar>
  </AppBar>
}

export default Nav
