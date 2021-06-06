import React, { useState, useReducer } from 'react';
import ChatCountDialog from './ChatCountDialog';
import AdminMessage from './AdminMessage';
import ChatHeader from './ChatHeader';
import UserMessage from './UserMessage';
import _ from 'lodash';
import { SERVER_URL } from './config';
const axios = require('axios');

const style = {
    // background: "linear-gradient(110deg, #fff 55%, #fdcd3b 55%)"
    // backgroundColor: '#fdcd3b'
}

function Chat() {
    const [message, setMessage] = useState("");
    const [loadingStatus, setLoadingStatus] = useState({
        isLoading: false,
        isLoaded: false,
    });
    const [notes , addToNotes] = useReducer((notes, message) => 
    {
        return [...notes, message];
    }, []);
    const [chatState, addToMessages] = useReducer(
        (chatState, { messages }) => {

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
    const { chatCount, messages } = chatState;
    const name = "Sree";

    // if (!loadingStatus.isLoading && !loadingStatus.isLoaded) {
    //     setLoadingStatus({
    //         ...loadingStatus,
    //         isLoading: true,
    //     });
    //     axios({
    //         method: 'get',
    //         url: SERVER_URL,
    //         responseType: 'json'
    //     }).then(function (response) {
    //         let msgs = response.data;
    //         console.log(response);
    //         console.log(message.length);
    //         addToMessages({ messages: msgs })
    //         setLoadingStatus({
    //             isLoading: false,
    //             isLoaded: true,
    //         });
    //     }).catch(function (error) {
    //         setLoadingStatus({
    //             isLoading: false,
    //             isLoaded: true,
    //         });
    //     })
    // }

    let msgs = [];
    let data = JSON.parse(window.localStorage.getItem("data"));
    console.log(data);
    for (let i = 0; i < data.messages.length; i++) {
        let tag = data.messages[i].tag;
        if (tag == "admin") {
            msgs.push(<AdminMessage key={i.toString()} text={data.messages[i].msg} tag={data.messages[i].tag} id={i.toString()} />)
        } else {
            msgs.push(<UserMessage key={i.toString()} text={data.messages[i].msg} tag={data.messages[i].tag} id={i.toString()} />)
        }
    }

    return (
        <div className="">
            <div style={style} className="h-screen w-full flex content-center">
                <div className="m-auto">
                    <div className="flex flex-col h-screen w-screen justify-between">
                        {/* <header className="content-center w-full h-16 bg-yellow-400">
                            <span className="align-bottom">Hey there!</span>
                        </header> */}
                        <ChatHeader className="w-full" name={name}/>
                        <main className="mb-auto h-screen overflow-y-scroll bg-yellow-100">
                            {msgs}
                        </main>
                        <hr className="divide-y-6"></hr>
                        <footer class="h-24 w-screen flex">
                            <textarea className="w-full outline-none p-2.5" value={message} placeholder="Type a message" onChange={(evt) => setMessage(evt.target.value)} />
                            <button className="w-24 bg-yellow-500 p-2.5" onClick={() => {
                                let date = new Date;
                                if (message != "") {
                                    setMessage("");    
                                    axios({
                                        method: 'post',
                                        url:`${SERVER_URL}/add`,
                                        data: {
                                            rid: 1,
                                            msg: message,
                                            tag: "user",
                                            type: "text"
                                            }
                                    }).then((response) => {
                                        console.log(response);
                                        addToNotes(message);
                                    })
                                }; 
                            }}>Send</button>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    )

    // return(
    //     <div >
    //         <div><ChatCountDialog countOfChats={chatCount}/>
    //         {
    //             !loadingStatus.isLoaded ? "Loading" : ""
    //         }
    //         {msgs}
    //         <br /><br />
    //         <br />
    //         <div><textarea value={message} placeholder="Type a message" onChange={(evt) => setMessage(evt.target.value)}/>
    //         {/* <br /> */}
    //         <button onClick={
    //             () => {
    //                 let random = Math.floor(Math.random()*11);
    //                 let date = new Date;
    //                 let time = date.getTime();
    //                 if (message != "") {
    //                     setMessage("");    
    //                     axios({
    //                         method: 'post',
    //                         url:`http://${SERVER_URL}/add`,
    //                         data: {
    //                             userid: "vava",
    //                             message: {
    //                                 msg: message,
    //                                 time: time
    //                             }
    //                         }
    //                     }).then((response) => {
    //                         console.log(response);
    //                         addToMessages({messages: [{"msg":message,"time":time}]});
    //                     })
    //                 };


    //             }
    //         }>Send</button></div></div>
    //     </div>
    // );
}

export default Chat;