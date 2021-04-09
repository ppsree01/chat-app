import React, {useState} from 'react';


function ChatCountDialog(props) {
    const styles = {
        messageHeader : {
            maxWidth: '100%',
            minWidth: '60%',
            backgroundColor: '#3b8974',
            color: 'white',
            fontWeight: 'bold',
            padding: '1em',
        }
    }
    return (
        <div style={styles.messageHeader}>Message Count : {props.countOfChats}</div>
    );
}

export default ChatCountDialog;