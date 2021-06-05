import React, {useState, useReducer} from 'react';
import ChatCountDialog from './ChatCountDialog';
import Message from './Message';
import _ from 'lodash';
const SERVER_URL = "api.ppsree.net";

const axios = require('axios');
const styles = {
    message: {
        padding: '1em',
        border: '1px solid gray',
        marginBottom: '0px',
        resize: 'none'
        // fontFamily: 'roboto'
    },
    container: {
        // textAlign: 'center',
        // top: '20%',
        // left: '30%',
        overflow: 'auto',
        position: 'fixed',
        height: '400px',
        margin: '1em',
        // width: '80%',
        maxWidth: '19em',
        minWidth: '19em',
        border: '1px solid gray',
        boxSizing: 'border-box',
        alignItems: 'center'
    },
    button: {
        padding: '1em',
        backgroundColor: 'rgb(59, 137, 116)',
        border: '1px solid gray',
        color: 'white',
        fontWeight: 'bold',
        // width: '100%'
        // marginTop: '-1em'
    },
    typeContainer : {
        display: 'flex',
        padding: '1em',
        margin: '0',
        position: 'fixed',
        // width: '110%',
        top: '330px'
    }
};

function Chat() {
    const [message, setMessage] = useState("");
    const [loadingStatus, setLoadingStatus] = useState({
        isLoading: false,
        isLoaded: false,
    });
    const [chatState, addToMessages] = useReducer(
        (chatState, {messages}) => {  
            
            let chatMessages = [...chatState.messages, ...messages];
            
            chatMessages = _.sortBy(chatMessages, ['time']);

            return {
                messages: chatMessages,
                chatCount: chatMessages.length,
            }
        },
        {
            chatCount: 0,
            messages: []
        }
    );
    const {chatCount, messages} = chatState;
    
    if (!loadingStatus.isLoading && !loadingStatus.isLoaded) {
        setLoadingStatus({
            ...loadingStatus,
            isLoading: true,
        });
        axios({
            method: 'get',
            url: `http://${SERVER_URL}/vava`,
            responseType: 'json'
        }).then(function(response){
            let msgs = response.data;
            console.log(response);
            console.log(message.length);
            addToMessages({messages: msgs})
            setLoadingStatus({
                isLoading: false,
                isLoaded: true,
            });
        }).catch(function(error){
            setLoadingStatus({
                isLoading: false,
                isLoaded: true,
            });
        })
    }

    let msgs = [];
    for (let i=0; i<messages.length; i++) {
        msgs.push(<Message key={i.toString()} text={messages[i].msg} id={messages[i].id}/>);
    }

    return(
        <div>
            <div style={styles.container}><ChatCountDialog countOfChats={chatCount}/>
            {
                !loadingStatus.isLoaded ? "Loading" : ""
            }
            {msgs}
            <br /><br />
            <br />
            <div style={styles.typeContainer}><textarea value={message} style={styles.message} placeholder="Type a message" onChange={(evt) => setMessage(evt.target.value)}/>
            {/* <br /> */}
            <button style={styles.button} onClick={
                () => {
                    let random = Math.floor(Math.random()*11);
                    let date = new Date;
                    let time = date.getTime();
                    if (message != "") {
                        setMessage("");    
                        axios({
                            method: 'post',
                            url:`http://${SERVER_URL}/add`,
                            data: {
                                userid: "vava",
                                message: {
                                    msg: message,
                                    time: time
                                }
                            }
                        }).then((response) => {
                            console.log(response);
                            addToMessages({messages: [{"msg":message,"time":time}]});
                        })
                    };
                            
                    
                }
            }>Send</button></div></div>
        </div>
    );
}

export default Chat;