import { Container, Stack } from '@mui/material';
import { current } from '@reduxjs/toolkit';
import React, { Fragment, useEffect, useState } from 'react';
import Logo from '../../assets/logo.png';
import styles from './Contacts.module.css';

function Contacts({ contacts, currentUser, setSelectedContact }) {
    const [currentSelected, setCurrentSelected] = useState();

    const handelSetCurrentUser = (e) => {

    }

    useEffect(() => {
        if (currentUser) {

        }
    }, [currentUser])


    // console.log(contacts, currentUser && currentUser.avatarImage)
    return (
        <Fragment>
            {
                currentUser && (
                    <div className={[styles['sidebar']].join(' ')} >
                        <div className={['center1', styles['inlineDiv']].join(' ')}>
                            <img src={Logo} width="20%" height="20%" alt="logo" />
                            <h1>Chat-Mate</h1>
                        </div>
                        <div className={[styles['scrollbar']]} >
                            <Stack spacing={1}>
                                {
                                    contacts && contacts.map((contact, index) => {
                                        return (
                                            <div key={index} className={index === currentSelected ? styles['selected'] : ""} onClick={() => { setCurrentSelected(index); setSelectedContact(contact) }}>
                                                <div className={[styles['item'], styles['inlineDiv']].join(' ')}>
                                                    <img className={styles['avatar']} src={contact.avatar} width="20%" height="20%" alt={`${contact.name}-img`} />
                                                    <h3 style={{ marginInlineStart: '10px' }}>{contact.name}</h3>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Stack>
                        </div>
                        <div className={styles['below-avatar']}>
                            <div className={['center1'].join(' ')}>
                                <img src={currentUser.avatar} className={styles['user-avatar']} width="20%" height="20%" alt='current user' />
                                <h5 style={{ color: 'white' }}>{currentUser.name}</h5>
                                <p style={{ color: 'white' }}>Copyrights@2022</p> <span style={{ color: 'white' }}>osamakiyani6123@gmail.com</span>
                            </div>
                        </div>
                    </div>
                )
            }

        </Fragment>
    )
}

export default Contacts