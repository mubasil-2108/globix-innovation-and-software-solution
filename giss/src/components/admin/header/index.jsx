import React from 'react'
import './admin-header.css'
import { Avatar, Box, useTheme } from '@mui/material'
import { tokens } from '../../../theme'
import { useSelector } from 'react-redux'

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


const AdminHeader = ({ setOpen }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { user } = useSelector(state => state.auth);
    return (
        <header style={{ background: colors.primary[400] }} className='header'>
            <Box className='logout-container' >
            <Box sx={{ cursor: 'pointer', }} >
                    <Avatar style={{ width: 35, height: 35, fontSize: '18px', fontWeight: '500', textAlign: 'center' }} {...stringAvatar(user.name)} />
                </Box>
            </Box>
        </header>
    )
}

export default AdminHeader