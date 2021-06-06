import Axios from 'axios';
import React, { useState } from 'react';
import Link from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import * as config from 'config';
const axios = require('axios');
const SERVER_URL = config.SERVER_URL;

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();   
    let message_to_user = "Please choose a password.";

    function auth() {
       console.log(username, password); 
       // Axios to call: localhost:8080/auth
       axios({
           method: 'post',
           url: `${SERVER_URL}/auth`,
           data: {
                username: username,
                password: password
            },
           responseType: 'json'
       }).then(function(response){
            if (response.data && response.data.success == true) {
                // redirect passing in the username, rid and messages.
                window.localStorage.setItem("user", username);
                window.localStorage.setItem("data", JSON.stringify(response.data.room));
                history.push("/chat");
            }
            else if (response.data && response.data.success == false ) {
                console.log("No");
                message_to_user = "Incorrect username / password";
            }
       }).catch(function(error) {
            console.log(error);
       })
    }

    return (<> 
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
            <div className="mb-4">
                <label className="block text-grey-darker text-sm font-bold mb-2" for="username">
                    Username
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" value={username} onChange={(evt) => {setUsername(evt.target.value)}} id="username" type="text" placeholder="Username" />
            </div>
            <div className="mb-6">
                <label className="block text-grey-darker text-sm font-bold mb-2" for="password">
                    Password
                </label>
                <input className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" value={password} onChange={(evt) => {setPassword(evt.target.value)}} id="password" type="password" placeholder="******************" />
                <p className="text-red text-xs italic">{message_to_user}</p>
            </div>
            <div className="items-center justify-between">
                <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={() => {auth()}}>
                    Sign In
                </button>
                {/* <a className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="#" >
                    Forgot Password?
                </a> */}
            </div>
        </div>
        </>
    )
}