import React from 'react';
import './Login.scss';
import logo from '../../wiw-logo.png';
import { useState } from 'react';
import axios from 'axios';

function Login({ show, hide }:{ show:any, hide:any }) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    function handleSubmit(event: any) {
        event.preventDefault();

        let data = {
            'email': email,
            'password': password,
        }
        
        console.log(data);
        axios.post('http://127.0.0.1:8000/login').then(response => {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });

    }

    return (
        <div>
            {show &&
                <div id="Login" className="wiw-input">
                    <div className="close" aria-label="Close" onClick={hide}>
                        <span aria-hidden="true">&times;</span>
                    </div>
                    <div className="logo"><img src={logo} alt="logo" /></div>
                    <div className="email"><span>Email</span> <input name="email" type="email" value={email} onChange={e => setEmail(e.target.value)} /></div>
                    <div className="password"><span>Password</span> <input id="password" name="password" type="password" value={password} onChange={e => setPassword(e.target.value)}  /></div>
                    <div className="submit"><div className="wiw-button"> <button>Submit</button></div></div>
                </div>
            }
        </div>
    )
}
  

export default Login;