import React, { Fragment, useState } from 'react';
import Picker from 'emoji-picker-react';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { Grid, IconButton, TextField } from '@mui/material';
import styles from './ChatInput.module.css';

function ChatInput({ sendMsgHandler }) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");

    const emojiPickerHideShowHandler = () => {
        setShowEmojiPicker(!showEmojiPicker);
    }

    const emojiClickHandler = (e, emoji) => {
        let message = msg;
        message += emoji.emoji;
        setMsg(message);
    }

    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            sendMsgHandler(msg);
            setMsg('');
        }
    }

    return (
        <Fragment>
            <form onSubmit={sendChat}>
                <Grid
                    container
                // style={{ display: 'inline-flex', width: '100%' }} 
                >
                    <Grid item xs={1} >
                        <div >
                            <div onClick={emojiPickerHideShowHandler} >
                                <IconButton>
                                    <EmojiEmotionsIcon sx={{ color: '#3471cf' }} fontSize="large" />
                                </IconButton>
                                {showEmojiPicker && <Picker onEmojiClick={emojiClickHandler} />}
                            </div>
                        </div>
                    </Grid>
                    <Grid
                        item
                        xs={10}
                    //  className={showEmojiPicker ? styles['text'] : ''}
                    >
                        <TextField value={msg} onChange={(e) => setMsg(e.target.value)} type="text" placeholder='Enter your text here' fullWidth />
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton type='submit'>
                            <SendIcon sx={{ color: '#1565c0' }} fontSize="large" />
                        </IconButton>
                    </Grid>
                </Grid>
            </form>
        </Fragment>
    )
}

export default ChatInput