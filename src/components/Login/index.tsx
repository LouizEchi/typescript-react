import React, { useState } from 'react'
import { useLogin } from './states'

import logo from '@assets/wiw-logo.png'

import './styles.scss'

export interface ILogin {
    show: boolean
    hide: () => void
}

function Login(login: ILogin) {
    const { show, hide } = login
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    return (
        <div>
            {show ? (
                <div id="Login" className="wiw-input">
                    <div className="close" aria-label="Close" onClick={hide}>
                        <span aria-hidden="true">&times;</span>
                    </div>
                    <div className="logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="email">
                        <span>Email</span>{' '}
                        <input
                            name="email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="password">
                        <span>Password</span>{' '}
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="submit">
                        <div className="wiw-button">
                            {' '}
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            ) : (
                ''
            )}
        </div>
    )
}

export const States = {
    useLogin,
}

export default Login
