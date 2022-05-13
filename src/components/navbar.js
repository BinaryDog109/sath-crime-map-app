import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import MapIcon from '@mui/icons-material/Map'
import ListItemIcon from '@mui/material/ListItemIcon'
import LoginIcon from '@mui/icons-material/Login'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import { useNavigate } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout'
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound'
import {
    AppBar,
    Box,
    Button,
    Toolbar,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
} from '@mui/material'
export default function Navbar() {
    const navigate = useNavigate()
    const [uid, setUid] = React.useState(sessionStorage.getItem('uid'))
    const [state, setState] = React.useState({
        bottom: false,
    })

    const toggleDrawer = (anchor, open) => (event) => {
        setState({ ...state, [anchor]: open })
    }
    const handleLogin = () => {
        console.log('nav to login')
        navigate('/login')
    }
    const handleLogout = () => {
        sessionStorage.clear()
        navigate('/login')
    }
    const handleRegister = () => {
        console.log('nav to register')
        navigate('/register')
    }
    const handleMap = () => {
        console.log('nav to map')
        navigate('/MapPage')
    }
    const handlePrice = () => {
        console.log('nav to price')
        navigate('/price')
    }

    const list1 = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 200, zIndex: 1 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            // onClick={handleMenu}
                            color="inherit"
                        >
                        </IconButton>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary='Logout' onClick={handleLogout} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <MapIcon />
                        </ListItemIcon>
                        <ListItemText primary="Map" onClick={handleMap} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <CurrencyPoundIcon />
                        </ListItemIcon>
                        <ListItemText primary="Price" onClick={handlePrice} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )


    const list2 = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 200, zIndex: 1 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <LoginIcon />
                        </ListItemIcon>
                        <ListItemText primary='Login' onClick={handleLogin} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <HowToRegIcon />
                        </ListItemIcon>
                        <ListItemText primary='Register' onClick={handleRegister} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <MapIcon />
                        </ListItemIcon>
                        <ListItemText primary="Map" onClick={handleMap} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <CurrencyPoundIcon />
                        </ListItemIcon>
                        <ListItemText primary="Price" onClick={handlePrice} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer('left', true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        SATH
                    </Typography>
                    {/* <Button color="inherit" >Login</Button> */}
                </Toolbar>
            </AppBar>
            <Drawer
                anchor='left'
                open={state['left']}
                onClose={toggleDrawer('left', false)}
            >
                {uid ? list1('left') : list2('left')}
            </Drawer>

        </Box>
    )
}