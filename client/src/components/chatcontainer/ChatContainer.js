import { Container } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import { axiosGetAllMessages, axiosSendMessage } from '../../utils/Api';
import { toastOptions } from '../../utils/constants';
import ChatInput from '../chatinput/ChatInput'
import Messages from '../messages/Messages';
import NavBar from '../navbar/NavBar';
import styles from './ChatContainer.module.css';

function ChatContainer({ currentUser, socket }) {
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef();

    useEffect(() => {
        async function callApi() {
            const sender = JSON.parse(localStorage.getItem('chat-app-user'));

            const response = await axiosGetAllMessages({
                from: sender.id,
                to: currentUser._id
            });
            console.log('response.data')
            console.log(response.data)
            if (response.status === 200) {
                setMessages(response.data)
            }
        }
        if (currentUser) {
            callApi();
        }
    }, [currentUser])

    const sendMsgHandler = async (msg) => {
        const sender = JSON.parse(localStorage.getItem('chat-app-user'));
        const data = await axiosSendMessage({
            from: sender.id,
            to: currentUser._id,
            message: msg
        })

        socket.current.emit("send-msg", {
            to: currentUser._id,
            from: sender.id,
            message: msg
        })

        const msgs = [...messages];
        console.log('msgs')
        console.log(msgs)
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);

        console.log(data)
        if (data.status !== 200) {
            data.data.message ? toast.error(data.data.message, toastOptions) : toast.error("Something went wrong", toastOptions)
        }
    }

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieve", (message) => {
                setArrivalMessage({ fromSelf: false, message: message })
            })
        }
    }, [])

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage])

    useEffect(() => {
        scrollRef.current && scrollRef.current.scrollIntoView({ behaviour: "smooth" });
        // scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }, [messages])


    return (
        <>
            {currentUser &&
                <Container className={styles['container']}>
                    <NavBar currentUser={currentUser} />

                    <Container className={styles['container2']}>
                        <Messages messages={messages} scrollRef={scrollRef} />
                        <ChatInput sendMsgHandler={sendMsgHandler} />
                    </Container>
                </Container >
            }
        </>
    )
}

export default ChatContainer