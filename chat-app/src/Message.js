import React, {useState} from 'react';

function Message({text}) {
    const styles = {
        message : {
            backgroundColor: 'silver',
            padding: '.3em .8em',
            margin: '1em',
            border: '1px solid gray',
            borderRadius: '5px',
            width: '20%',
            maxWidth: '100%',
            textAlign: 'left'
        },
        container : {
            textAlign: 'right'
        }
    }
    return (
        <div style={styles.container}>
            <p style={styles.message}>{text}</p>
        </div>
    );
}

export default Message;