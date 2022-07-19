import { Button, Grid, Stack } from '@mui/material';
import { Container } from '@mui/system';
import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './SetAvatar.module.css';
import Loading from '../assets/loading.gif';
import { axiosSetAvatarRoute } from '../utils/Api';
import { useDispatch } from 'react-redux';
import { signin } from '../Store/Actions/user';

const toastOptions = {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}
const api = 'https://api.multiavatar.com/45678000';


function SetAvatar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("chat-app-user"));
        console.log(user);
        user.isAvatarImageSet && navigate('/chats');
    }, [navigate])

    const setProfilePicture = async () => {
        if (!selectedAvatar) {
            toast.error("Please select an avatar!", toastOptions);
        } else {
            const user = JSON.parse(localStorage.getItem('chat-app-user'));

            const formData = new FormData();
            formData.append('file', avatars[selectedAvatar]);
            formData.append('token', user.token);
            try {
                const { data } = await axiosSetAvatarRoute(user.id, formData)
                console.log(data.isSet)
                console.log(data)
                console.log(data.isSet)
                if (data.isSet) {
                    user.isAvatarImageSet = true;
                    user.avatarImage = data.image;
                    dispatch(signin(user));
                    toast.success("Avatar uploaded!", toastOptions)
                    navigate('/chats');
                } else {
                    toast.error("Error setting avatar, please try again", toastOptions)
                }
            } catch (err) {
                console.log(err)
            }
        }
    };

    useEffect(() => {
        var data = [];
        for (let i = 0; i < 2; i++) {
            data.push(`${api}/${Math.round(Math.random() * 1000)}.png`);
            data.push(`${api}/${Math.round(Math.random() * 1000)}.png`);
        }
        setAvatars(data);

        setTimeout(() => {
            setIsLoading(false);
        }, 2000)
    }, []);

    return (
        <Fragment>
            {
                isLoading ? <div className='center' style={{ marginTop: '49vh' }}><img width={60} src={Loading} alt="loader/" /></div> :
                    <Container
                        maxWidth='md'
                        sx={{
                            // backgroundColor: 'blue',

                        }}
                    >
                        <Stack spacing={2} className='center'>
                            <h1 style={{ marginTop: '35%', color: 'black' }}>Pick an avatar as your profile picture</h1>
                            <Grid container spacing={1}>
                                {
                                    avatars.map((avatar, index) => {
                                        return (
                                            <Grid item xs={3} sx={{
                                                '&:hover': {
                                                    opacity: [0.9, 0.8, 0.7],
                                                },
                                            }} key={index}
                                            >
                                                <div className={selectedAvatar === index ? styles['selected'] : styles["notSelected"]} >
                                                    <img src={avatar} width="100%" height='100%' alt="avatar"
                                                        onClick={() => setSelectedAvatar(index)}
                                                    />
                                                </div>
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>
                            <Button style={{ marginTop: '6%', backgroundColor: 'black', height: '45px', color: 'white' }} variant='outlined' color='primary' size='large' onClick={setProfilePicture}>Set Profile Picture</Button>
                        </Stack>
                    </Container>
            }
        </Fragment>
    )
}

export default SetAvatar