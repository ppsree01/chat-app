import React, {useState, useReducer} from 'react';
import ChatCountDialog from './ChatCountDialog';
import Message from './Message';
import _ from 'lodash';
import { findAllByTestId } from '@testing-library/react';
const SERVER_URL = "api.ppsree.net";

const axios = require('axios');
const styles = {
    message: {
        backgroundColor: 'yellow',
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
        msgs.push(<Message key={i.toString()} text={messages[i].msg}/>);
    }

    return(
        <div>
            <ChatCountDialog countOfChats={chatCount}/>
            {
                !loadingStatus.isLoaded ? "Loading" : ""
            }
            {msgs}
            <br />
            <textarea value={message} style={styles.message} placeholder="Type a message" onChange={(evt) => setMessage(evt.target.value)}/>
            <br />
            <button onClick={
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
            }>Send</button>
        </div>
    );
}

export default Chat;