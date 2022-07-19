import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import styles from './NavBar.module.css'
import { useDispatch } from 'react-redux';
import { signout } from '../../Store/Actions/user';
import { useNavigate } from 'react-router-dom';

function NavBar({ currentUser }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onClickHandler = () => {
        dispatch(signout());
        navigate('/')
    }

    return (
        <Box sx={{ paddingTop: '10px' }}>
            <AppBar position="static" sx={{ backgroundColor: 'white', border: 'none', boxShadow: "none" }}>
                <Toolbar>
                    <img src={currentUser.avatar} width="8%" height="8%" alt="img" />
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1, color: '#1565ffff', marginLeft: '10px' }}>
                        {currentUser.name}
                    </Typography>
                    <Button variant='contained' sx={{ border: '2px solid #1565c05e', color: 'white', boxShadow: 'none' }} size="medium" onClick={onClickHandler}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default NavBar