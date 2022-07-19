import { Grid } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ChatContainer from '../components/chatcontainer/ChatContainer.js';
import Contacts from '../components/contacts/Contacts.js';
import Welcome from '../components/welcome/Welcome.js';
import { allUsers, url } from '../utils/Api';
import styles from './Chat.module.css';
import { io } from "socket.io-client";

export default function Chat() {
    const socket = useRef();
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState();
    const [selectedContact, setSelectedContact] = useState();

    const setSelectedContactHandler = (contact) => {
        setSelectedContact(contact)
    }

    useEffect(() => {
        console.log('aaaaaa')
        if (!localStorage.getItem('chat-app-user')) {
            navigate("/login");
        } else {
            setCurrentUser(JSON.parse(localStorage.getItem('chat-app-user')));
        }
    }, [navigate]);

    useEffect(() => {
        if (selectedContact) {
            socket.current = io(url);
            socket.current.emit("add-user", selectedContact._id)
        }
    }, [selectedContact])

    useEffect(() => {
        const callApi = async () => {
            try {
                if (currentUser) {
                    if (currentUser.isAvatarImageSet) {
                        const { data } = await allUsers(currentUser.id)
                        setContacts(data)
                        console.log(data)
                    } else {
                        navigate('/setAvatar');
                    }
                }
            } catch (err) {
                console.log(err)
            }
        }
        callApi();
    }, [currentUser, navigate]);
    console.log('contacts')
    console.log(contacts)
    return (

        <div className={styles['container']}>
            <Grid container className={styles['container']}>
                <Grid item xs={3} className={styles['container']}>
                    <Contacts contacts={contacts} currentUser={currentUser} setSelectedContact={setSelectedContactHandler} />
                </Grid>
                <Grid item xs={9} className={styles['container']}>
                    {
                        selectedContact ?
                            <ChatContainer currentUser={selectedContact} socket={socket} /> :
                            < Welcome currentUser={currentUser} />
                    }
                </Grid>
            </Grid>
        </div>
    )
}
