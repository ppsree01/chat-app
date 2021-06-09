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
        return [...notes, ...message];
    }, []);

    const name = window.localStorage.getItem("user");
    
    let data = JSON.parse(window.localStorage.getItem("data"));
    const roomid = data.rid;

    if (!loadingStatus.isLoading && !loadingStatus.isLoaded) {
        setLoadingStatus({
            ...loadingStatus,
            isLoading: true,
        });
        axios({
            method: 'get',
            url: `${SERVER_URL}/room/${roomid}`,
            responseType: 'json'
        }).then(function (response) {
            console.log(response);
            let msgs = response.data.room;
            addToNotes(msgs);
            setLoadingStatus({
                isLoading: false,
                isLoaded: true,
            });
        }).catch(function (error) {
            setLoadingStatus({
                isLoading: false,
                isLoaded: true,
            });
        })
    }

    

    let msgs = [];
    for (let i = 0; i < notes.length; i++) {
        let tag = notes[i].tag;
        if (tag == "admin") {
            msgs.push(<AdminMessage key={i.toString()} text={notes[i].msg} tag={notes[i].tag} id={i.toString()} />)
        } else {
            msgs.push(<UserMessage key={i.toString()} text={notes[i].msg} tag={notes[i].tag} id={i.toString()} />)
        }
    }
    

    return (
        <div className="">
            <div style={style} className="h-screen w-full flex content-center">
                <div className="m-auto">
                    <div className="flex flex-col h-screen w-screen justify-between">
                        
                        <ChatHeader className="w-full" name={name}/>
                        <main className="mb-auto h-screen overflow-y-scroll bg-yellow-100">
                            {msgs}
                        </main>
                        <hr className="divide-y-6"></hr>
                        <footer class="h-24 w-screen flex">
                            <textarea className="w-full outline-none p-2.5" value={message} placeholder="Type a message" onChange={(evt) => setMessage(evt.target.value)} />
                            <button className="w-24 bg-yellow-500 p-2.5 text-white font-semibold" onClick={() => {
                                let date = new Date;
                                if (message != "") {
                                    setMessage("");    
                                    axios({
                                        method: 'post',
                                        url:`${SERVER_URL}/add`,
                                        data: {
                                            rid: roomid,
                                            msg: message,
                                            tag: "user",
                                            type: "text"
                                            }
                                    }).then((response) => {
                                        console.log(response);
                                        addToNotes([
                                            {
                                                rid: roomid,
                                                msg: message,
                                                tag: "user",
                                                type: "text"
                                                }
                                        ]);

                                    })
                                }; 
                            }}>Send</button>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Chat;