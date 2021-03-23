import React, {useState} from 'react';

function Message({text,id}) {
    const styles = {
        message : {
            backgroundColor: 'silver',
            padding: '.3em .8em',
            margin: '1em',
            border: '1px solid gray',
            borderRadius: '5px',
            textAlign: 'left',
            display: 'inline-block'
        },
        container : {
            textAlign: 'left'
        }
    }
    return (
        <div style={styles.container} data-id={id}>
            <p style={styles.message}>{text}</p>
        </div>
    );
}

export default Message;