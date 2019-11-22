import Axios from 'axios'
import React, { useState } from 'react'
import { useRegister } from './states'

import logo from '@assets/wiw-logo.png'

import './styles.scss'

// interface Credentials {
//     email: string
//     password: string
//     confirm: string
// }

function Register({ show, hide }: { show: any; hide: any }) {
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
        <div>
            {show && (
                <form onSubmit={handleSubmit}>
                    <div id="Register" className="wiw-input">
                        <div
                            className="close"
                            aria-label="Close"
                            onClick={hide}
                        >
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <div className="logo">
                            <img src={logo} alt="logo" />
                        </div>
                        <div className="register">Register</div>
                        <div className="email">
                            <span>Email</span>
                            <input
                                name="email"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="password">
                            <span>Password</span>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="confirm">
                            <span>Confirm Password</span>
                            <input
                                id="confirm"
                                name="confirm"
                                type="confirm"
                                value={confirm}
                                onChange={e => setConfirm(e.target.value)}
                            />
                        </div>
                        <div className="submit">
                            <div className="wiw-button">
                                {' '}
                                <button>Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </div>
    )
}

export const States = {
    useRegister,
}

export default Register
