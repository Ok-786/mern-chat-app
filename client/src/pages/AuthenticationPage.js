
import React, { Fragment, useState } from 'react'
import { Grid, IconButton, Paper, Typography } from '@mui/material';
import { Container } from '@mui/system';
import styles from './AuthenticationPage.module.css';
import NavigationTab from '../components/NavigationTab/NavigationTab';
import SignupForm from '../components/Signup/Signup';
import SigninForm from '../components/Signin/Signin';
import Logo from '../assets/logo.gif';

const HomePage = () => {
    const [active, setActive] = useState('Signin');

    const setActiveHandler = (component) => {
        setActive(component);
    }

    return (
        <Fragment>
            <Container maxWidth='xs' style={{ paddingTop: '10%' }}>
                <Grid container spacing={0} >
                    <Paper className={styles['topContainer']}>
                        <Grid item xs={12}>
                            {/* <Typography color='#0288d1' variant='h2' textAlign='center' gutterBottom component='div' >
                                Chater Mate
                                <hr style={{ borderTop: '1px solid aqua' }} />
                            </Typography> */}
                            {/* <IconButton > */}
                            <div className={styles['centerLogo']}>
                                <img src={Logo} alt="aaaa" width='100px' />
                            </div>
                            {/* </IconButton> */}
                        </Grid>
                        <Grid item xs={12}>
                            <NavigationTab active={active} setActiveHandler={setActiveHandler} />
                            <div className={styles['form']} >
                                {active === 'Signup' ? <SignupForm /> : <SigninForm />}
                            </div>
                        </Grid>
                    </Paper>
                </Grid>
            </Container>
        </Fragment>
    )
}

export default HomePage