import Axios from 'axios'
import React, { useState } from 'react'
import { useRegister } from './states'

import logo from '@assets/wiw-logo.png'


import './styles.scss'

function Register() {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirm, setConfirm] = useState<string>('')

    function handleSubmit(event: any) {
        // let data = {
        //     email: email,
        //     password: password,
        //     password_confirmation: confirm,
        // }
        event.preventDefault()

        Axios.post('http://127.0.0.1:8000/register')
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
                        <p>Register</p>
                        <form onSubmit={handleSubmit}>
                            <input className="input is-primary" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                            <input className="input is-primary" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                            <input className="input is-primary" type="confirm" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Confirm" />
                            <button className="button is-primary is-normal is-outlined is-rounded">Submit</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export const States = {
    useRegister,
}

export default Register
