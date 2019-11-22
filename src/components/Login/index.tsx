import Axios from 'axios'
import React, { useState } from 'react'
import { useLogin } from './states'

import './styles.scss'

import logo from '@assets/wiw-logo.png'

function Login() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    function handleSubmit(event: any) {
        // let data = {
        //     email: email,
        //     password: password,
        //     password_confirmation: confirm,
        // }
        event.preventDefault()

        Axios.post('http://127.0.0.1:8000/login')
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div id="Login">
            <section className="section">
                <div className="box">
                        <div>
                            <div><img src={logo} className="App-logo" alt="logo" /></div>
                            <p>Login</p>
                            <form onSubmit={handleSubmit}>
                                <input className="input is-primary" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                                <input className="input is-primary" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                                <button className="button is-primary is-normal is-outlined is-rounded">Submit</button>
                            </form>
                        </div>
                </div>
            </section>
        </div>
    )
}

export const States = {
    useLogin,
}

export default Login
