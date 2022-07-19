import { Button, CircularProgress, TextField, Typography } from '@mui/material'
import React, { Fragment, useState } from 'react';
import { toast } from 'react-toastify';
// import { url } from '../../../Api/user';
import useHttps from '../../Hooks/use-https';
import { axiosSignup, fetchApiSignup } from '../../utils/Api';


const SignupForm = () => {

    const initFormInputs = {
        email: ' ',
        name: ' ',
        password: ' ',
        confirmPassword: ' '
    }
    const toastOptions = {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }

    const [formInputs, setFormInputs] = useState(initFormInputs);
    const [isLoading, setIsLoading] = useState(false);



    const onBlurHandler = (event) => {
        if (event.target.value === '') {
            setFormInputs({
                ...formInputs,
                [event.target.name]: ''
            })
        }
    }

    const handleSetFormInputs = (event) => {
        event.target.name === "file" ?
            setFormInputs({
                ...formInputs,
                file: event.target.files[0]
            })
            :
            setFormInputs({
                ...formInputs,
                [event.target.name]: event.target.value
            })
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();


        if (!(!!formInputs.name & !!formInputs.email & !!formInputs.password & !!formInputs.confirmPassword)) {
            toast.error('Please fill all fields!', toastOptions);
            return;
        }
        console.log(!(!!formInputs.name & !!formInputs.email & !!formInputs.password & !!formInputs.confirmPassword))

        if (formInputs.password !== formInputs.confirmPassword) {
            toast.error("Passwords don't match", toastOptions);
            return;
        }


        if (formInputs.name === ' ' && formInputs.email === ' ' && formInputs.password === ' ' && formInputs.confirmPassword === ' ') {
            setFormInputs({
                email: '',
                name: '',
                password: '',
                confirmPassword: ''
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
            const { data } = await axiosSignup(formInputs);
            setIsLoading(false);
            toast.success("User registered successfully!", toastOptions)
            setFormInputs({
                email: ' ',
                name: ' ',
                password: ' ',
                confirmPassword: ' '
            });
        } catch (err) {
            setIsLoading(false);
            toast.error(err.response.data.message, toastOptions)
            console.log(err)
        }
    }

    return (
        <Fragment>
            <form onSubmit={onSubmitHandler}>
                <Typography variant='p' component='div' style={formInputs.name === '' ? { color: 'black' } : { color: 'black' }}  > Name: </Typography>
                <TextField value={formInputs.name.trim()} error={formInputs.name === '' ? true : false} onBlur={onBlurHandler} name="name" onChange={handleSetFormInputs} variant='outlined' type="text" size='small' fullWidth />

                <Typography variant='p' component='div' sx={{ marginTop: '2%' }} style={formInputs.email === '' ? { color: 'red' } : { color: 'black' }}> Email Address: </Typography>
                <TextField value={formInputs.email.trim()} name="email" error={formInputs.email === '' ? true : false} onBlur={onBlurHandler} variant='outlined' onChange={handleSetFormInputs} type="email" size='small' fullWidth />

                <Typography sx={{ marginTop: '2%' }} variant='p' component='div' style={formInputs.password === '' ? { color: 'red' } : { color: 'black' }}> Password: </Typography>
                <TextField value={formInputs.password.trim()} name="password" variant='outlined' error={formInputs.password === '' ? true : false} onBlur={onBlurHandler} onChange={handleSetFormInputs} type="password" size='small' fullWidth />

                <Typography sx={{ marginTop: '2%' }} variant='p' component='div' style={formInputs.confirmPassword === '' ? { color: 'red' } : { color: 'black' }}> Confirm Password: </Typography>
                <TextField value={formInputs.confirmPassword.trim()} name="confirmPassword" error={formInputs.confirmPassword === '' ? true : false} onBlur={onBlurHandler} variant='outlined' onChange={handleSetFormInputs} type="password" size='small' fullWidth />

                {/* <Typography sx={{ marginTop: '2%' }} variant='p' component='div' style={formInputs.file === '' ? { color: 'red' } : { color: 'gray' }}> Upload Photo: </Typography> */}
                {/* <FileBase name="image" type="file" multiple={false} onDone={(event) => { handleSetFormInputs(event) }} /> */}
                {/* <input type='file' accept="image/" name="file" onChange={handleSetFormInputs} /> */}

                <Button type="submit" variant='contained' disabled={isLoading} color='primary' sx={{ marginTop: '5%' }} fullWidth>{isLoading ? <CircularProgress size={28} /> : 'Signup'}</Button>
            </form>
        </Fragment>
    )
}

export default SignupForm