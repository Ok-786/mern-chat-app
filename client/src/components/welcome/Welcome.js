import React, { Fragment } from 'react';
import Gif from '../../assets/welcome.gif';

function Welcome({ currentUser }) {
    return (
        <Fragment>
            <div className='center' style={{ marginTop: '15%' }}>
                <img src={Gif} width="40%" alt="welcome" />
                <h2>Welcome, <span style={{ color: 'rgb(22, 121, 250)' }}>{currentUser && currentUser.name}!</span></h2>
                <h4>Please Select a chat to start messaging</h4>
            </div>
        </Fragment>
    )
}

export default Welcome