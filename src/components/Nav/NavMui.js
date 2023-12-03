import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import './Nav.css';

const pages = ['Home', 'News', 'About', 'Contact', 'CRUD'];
// const settings = ['Login with Google', 'Logout'];

if (localStorage.getItem('userData') !== null) {
    // User data is present in localStorage, so show the "CRUD" page
    if (!pages.includes('CRUD')) {
        pages.push('CRUD'); // Add the "CRUD" page if it's not already in the array
    }   
} else {
    // User data is not present in localStorage, so remove the "CRUD" page
    const index = pages.indexOf('CRUD');
    if (index !== -1) {
        pages.splice(index, 1); // Remove the "CRUD" page from the array
    }
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#171717',
        }
    },
});

function NavMui() {
    const handleLogout = () => {
        // Clear localStorage when logging out
        localStorage.clear();

        // You may also want to sign out from Google here, depending on your use case
        googleLogout();
        window.location.reload();
        console.log('Logout Succesful');
    }
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ boxShadow: 1 }} >
            <ThemeProvider theme={theme}>
                <AppBar position="fixed" >
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="#app-bar-with-responsive-menu"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                <Link to={`/`} className='nav-logo'>
                                    <img className='nav-logo-img' src="/assets/images/Logo.png" />
                                </Link>

                            </Typography>

                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: 'block', md: 'none' },
                                    }}
                                >
                                    {pages.map((page) => (
                                        <Link key={page} to={page === 'Home' ? '/' : `/${page}`}>
                                            <MenuItem onClick={handleCloseNavMenu}>
                                                <Typography textAlign="center" color="black">{page}</Typography>
                                            </MenuItem>
                                        </Link>
                                    ))}
                                </Menu>
                            </Box>

                            <Typography
                                variant="h5"
                                noWrap
                                component="a"

                                sx={{
                                    mr: 2,
                                    display: { xs: 'flex', md: 'none' },
                                    flexGrow: 1,
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                <Link to={`/`} className='nav-logo'>
                                    <img className='nav-logo-img' src='/assets/images/Logo.png' />
                                </Link>
                            </Typography>

                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, marginLeft: '2rem' }}>
                                {pages.map((page) => (
                                    <Link key={page} to={page === 'Home' ? '/' : `/${page}`}>
                                        <Button
                                            onClick={handleCloseNavMenu}
                                            sx={{ my: 2, color: 'white', display: 'block', margin: 'auto 1rem' }}
                                        >
                                            {page}
                                        </Button>
                                    </Link>
                                ))}
                            </Box>

                            <Box sx={{ flexGrow: 0 }}>
                                {localStorage.getItem('userData') ? (
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt={localStorage.getItem('userName')} src={localStorage.getItem('userAvatar')} />
                                        </IconButton>
                                    </Tooltip>
                                ) : (
                                    <Tooltip title="Open settings">
                                            <Button onClick={handleOpenUserMenu} sx={{ p: 0 }} variant="contained" startIcon={<LoginIcon />}>Login</Button>
                                    </Tooltip>
                                )}
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {localStorage.getItem('userData') ? (
                                        // User is logged in, so display "Logout"
                                        <MenuItem key="Logout" onClick={handleCloseUserMenu}>
                                            <Button onClick={handleLogout} variant="outlined" startIcon={<LogoutIcon />}>Logout</Button>
                                        </MenuItem>
                                    ) : (
                                        // User is not logged in, so display "Login with Google"
                                        <MenuItem key="Login with Google" onClick={handleCloseUserMenu}>
                                            <GoogleOAuthProvider clientId="626371292115-m98tukpftuuq30anio14r1o5pm2i0240.apps.googleusercontent.com">
                                                <GoogleLogin
                                                    onSuccess={credentialResponse => {
                                                        const decode = jwtDecode(credentialResponse.credential);
                                                        console.log(credentialResponse);
                                                        console.log(decode);

                                                        localStorage.setItem('userData', decode);
                                                        localStorage.setItem('userEmail', decode.email);
                                                        localStorage.setItem('userName', decode.name);
                                                        localStorage.setItem('userAvatar', decode.picture);
                                                        console.log(localStorage.getItem('userData'));

                                                        window.location.reload();
                                                    }}
                                                    onError={() => {
                                                        console.log('Login Failed');
                                                    }}
                                                    useOneTap
                                                />
                                            </GoogleOAuthProvider>
                                        </MenuItem>
                                    )}
                                </Menu>

                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </ThemeProvider>
        </Box>
    );
}
export default NavMui;