import { Button, CircularProgress, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
// import { url } from '../../../Api/user';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signin } from '../../Store/Actions/user';
import { toast } from 'react-toastify';
import { axiosSignin } from '../../utils/Api';

const SigninForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate('/setAvatar')
        }
    }, [navigate])

    const initFormInputs = {
        email: ' ',
        password: ' ',
    }
    const [formInputs, setFormInputs] = useState(initFormInputs);

    const [isLoading, setIsLoading] = useState(false);

    const [buttonNumber, setButtonNumber] = useState(null);


    const handlerOnFocus = (event) => {
        event.target.value === '' &&
            setFormInputs({
                ...formInputs,
                [event.target.name]: ''
            })
    }

    const handleSetFormInputs = (event) => {
        setFormInputs({
            ...formInputs,
            [event.target.name]: event.target.value
        })
    }

    // const onSubmitHandler = async (e) => {
    //     e.preventDefault();

    //     // await sendRequest({
    //     //     url: `${url}/user/login`,
    //     //     method: 'POST',
    //     //     headers: { 'Content-Type': 'application/json' },
    //     //     body: JSON.stringify(formInputs)
    //     // });


    // }
    const toastOptions = {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }

    const onBlurHandler = (event) => {
        if (event.target.value === '') {
            setFormInputs({
                ...formInputs,
                [event.target.name]: ''
            })
        }
    }


    const onSubmitHandler = async (e) => {
        e.preventDefault();


        if (!(!!formInputs.email & !!formInputs.password)) {
            toast.error('Please fill all fields!', toastOptions);
            return;
        }



        if (formInputs.email === ' ' && formInputs.password === ' ') {
            setFormInputs({
                email: '',
                password: '',
            })

            toast.error("Please fill all fields!", toastOptions)
            return
        }


        // sendRequest({
        //     url: `http://localhost:8000/api/auth/register`,
        //     headers: { 'Content-Type': 'application/json' }, //when sending formdata we dont set headers
        //     method: 'POST',
        //     body: JSON.stringify(formInputs)
        // })

        try {
            setIsLoading(true);
            const { data } = await axiosSignin(formInputs);
            setIsLoading(false);
            dispatch(signin(data));
            navigate('/setAvatar')

            console.log("aaa")
            toast.success("User loggedin successfully!", toastOptions)
        } catch (err) {
            setIsLoading(false);
            err.response.data ? toast.error(err.response.data.message, toastOptions) : toast.error(err.message, toastOptions)
            console.log(err, "aaa")
        }

    }


    return (
        <form onSubmit={onSubmitHandler}>

            <Typography variant='p' component='div' sx={{ marginTop: '2%' }} style={formInputs.email === '' ? { color: 'red' } : { color: 'black' }}> Email Address: </Typography>
            <TextField value={formInputs.email.trim()} name="email" error={formInputs.email === '' ? true : false} onFocus={handlerOnFocus} variant='outlined' onChange={handleSetFormInputs} type="email" size='small' fullWidth />

            <Typography sx={{ marginTop: '2%' }} variant='p' component='div' style={formInputs.password === '' ? { color: 'red' } : { color: 'black' }}> Password: </Typography>
            <TextField value={formInputs.password.trim()} name="password" variant='outlined' error={formInputs.password === '' ? true : false} onFocus={handlerOnFocus} onChange={handleSetFormInputs} type="password" size='small' fullWidth />

            <Button type="submit" variant='contained' onClick={() => setButtonNumber(0)} disabled={isLoading} color='info' sx={{ marginTop: '5%' }} fullWidth>{isLoading && buttonNumber === 0 ? <CircularProgress size={28} /> : 'Signin'}</Button>
            <Button onClick={() => {
                setButtonNumber(1);
                onSubmitHandler();
                navigate('/setAvatar')
            }} disabled={isLoading ? true : false} variant='contained' sx={{ marginTop: '2%', color: 'white', fontWeight: 'bold' }} color="primary" fullWidth>{isLoading && buttonNumber === 1 ? <CircularProgress size={28} /> : 'Login as Guest User'}</Button>

        </form>
    )
}

export default SigninForm