import React, { useEffect, useRef, useState } from 'react'
import './user-header.css'
import { FaBars, FaSignOutAlt } from 'react-icons/fa'
import { Avatar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Tab, Tabs, Typography, useMediaQuery, useTheme } from '@mui/material'
import { tokens } from '../../../theme'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { logoutUser } from '../../../store/auth-slice'

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name: string) {
    const nameParts = name.split(' ');
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: nameParts.length > 1
            ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
            : `${nameParts[0][0]}`,
    };
}

const UserHeader = ({ setOpen }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const colors = tokens(theme.palette.mode);
    const { user } = useSelector(state => state.auth);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const avatarRef = useRef(null);
    const [activeTab, setActiveTab] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    const navItems = [
        { label: 'Home', path: '/user/home' },
        { label: 'About Us', path: '/user/about' },
    ];

    // On component mount, check for last path and navigate if needed
    useEffect(() => {
        const lastPath = sessionStorage.getItem('lastPath');
        if (lastPath && lastPath !== location.pathname) {
            navigate(lastPath);
        }
    }, []);

    // Store current path in session storage whenever it changes
    useEffect(() => {
        sessionStorage.setItem('lastPath', location.pathname);
        
        // Update active tab based on current path
        const currentIndex = navItems.findIndex(item => item.path === location.pathname);
        if (currentIndex !== -1) {
            setActiveTab(currentIndex);
        }
    }, [location.pathname]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
        avatarRef.current?.blur();
    };

    const handleLogout = async () => {
        sessionStorage.setItem('lastPathBeforeLogout', location.pathname);
        await dispatch(logoutUser());
    }

    const isMobile = useMediaQuery('(max-width: 768px)');
   
    const handleDrawerToggle = () => {
        setDrawerOpen(prev => !prev);
    };

    const handleNavigation = (path: string) => {
        navigate(path);
        sessionStorage.setItem('lastPath', path);
    };

    return (
        <header style={{ background: '#000', position: 'sticky', top: 0, zIndex: 100 }} className='header'>
            <Box sx={{ display: 'flex', flex: 1, alignItems: 'center', background: '#000', justifyContent: 'space-between' }}>
                {
                    !isMobile ? (
                        <>
                            <Box onClick={() => handleNavigation('/')} sx={{ cursor: 'pointer' }} >
                                <img src="../../assets/logo-white.png"
                                    style={{
                                        width: '180px',
                                        height: '60px',
                                        objectFit: 'contain'
                                    }}
                                    alt="logo" className='logo' />
                            </Box>

                            <Tabs
                                value={activeTab}
                                onChange={(e, newValue) => setActiveTab(newValue)}
                                textColor="inherit"
                                indicatorColor="secondary"
                                centered
                            >
                                {navItems.map((item, index) => (
                                    <Tab
                                        key={index}
                                        label={item.label}
                                        onClick={() => {
                                            setActiveTab(index);
                                            handleNavigation(item.path);
                                        }}
                                        sx={{ color: '#fff', minWidth: 'auto', textTransform: 'none', fontWeight: 'bold' }}
                                    />
                                ))}
                            </Tabs>
                        </>
                    ) : (
                        <>
                            <IconButton size='small'><FaBars color='#fff' onClick={handleDrawerToggle} /></IconButton>
                            <Drawer anchor="left" sx={{ '& .MuiDrawer-paper': { borderTopRightRadius: 50, borderBottomRightRadius: 50, background: ' rgb(29, 28, 28)' } }} open={drawerOpen} onClose={handleDrawerToggle}>
                                <Box sx={{ width: 250, pt: 5, }} role="presentation" onClick={handleDrawerToggle}>
                                    <Box cursor='pointer' >
                                        <img src="../../assets/logo-white.png"
                                            onClick={() => handleNavigation('/')}
                                            style={{
                                                width: '100%',
                                                objectFit: 'contain'
                                            }}
                                            alt="logo" className='logo' />
                                    </Box>

                                    <List>
                                        {navItems.map((item, index) => (
                                            <ListItem button key={index} onClick={() => handleNavigation(item.path)}>
                                                <ListItemText sx={{ color: '#fff', fontWeight: 700 }} primary={item.label} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            </Drawer>
                        </>
                    )
                }

                <Box sx={{ cursor: 'pointer', }} >
                    <Avatar ref={avatarRef} onClick={handleClick} style={{ width: 35, height: 35, fontSize: '18px', fontWeight: 'bold', textAlign: 'center' }} {...stringAvatar(user.name)} />
                </Box>
                <Menu
                    id="icon-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    sx={{ mt: '10px', }}
                    aria-hidden={'false'}
                >
                    <Box sx={{ width: '150px', }}>
                        <Box>
                            <Typography variant="subtitle1" fontWeight={'bold'} sx={{ textAlign: 'center' }}>Hello, {user.name}</Typography>
                        </Box>
                        <Divider sx={{ mt: 1, mb: 1 }} />
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <FaSignOutAlt size={20} />
                            </ListItemIcon>
                            <ListItemText>Log Out</ListItemText>
                        </MenuItem>
                    </Box>
                </Menu>
            </Box>
        </header>
    )
}

export default UserHeader