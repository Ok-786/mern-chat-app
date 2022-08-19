import { Container } from '@mui/material';
import React, { useEffect } from 'react';
import styles from './Messages.module.css';

function Messages({ messages, scrollRef }) {
    useEffect(() => {

    }, [])

    return (
        <div className={styles['container']}>
            messages
            {
                messages.map((message) => {
                    return (
                        <div key={message.message + Math.random()}>
                            <div className={message.fromSelf ? styles['sended'] : styles['recieved']}>
                                {message.message}
                            </div>
                        </div>
                    )
                })
            }
            <div ref={scrollRef} />
        </div>
    )
}

export default Messages;