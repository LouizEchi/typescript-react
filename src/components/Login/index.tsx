import API from '../../API'

import React, { useState } from 'react'

import { useLogin } from './states'

import Message from '@src/components/Message'

import './styles.scss'

import logo from '@assets/wiw-logo.png'

function Login() {
    const [showMessage, setShowMessage] = useState(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    async function handleSubmit(event: any) {
        event.preventDefault()
        const data = {
            email,
            password,
        }

        await API.post('/login', data).then((response) => {
            if (response.status === 200) {
                setShowMessage(true)
                setInterval(timer, 2000)
            } else {
                setShowMessage(false)
            }
        })
    }

    function timer() {
        setShowMessage(false)
        window.location.assign('/Dashboard/Event')
    }

    return (
        <div id="Login">
            {showMessage ? <Message /> : ''}
            <section className="section">
                <div className="box">
                    <div>
                        <div>
                            <img src={logo} className="App-logo" alt="logo" />
                        </div>
                        <p>Login</p>
                        <form onSubmit={handleSubmit}>
                            <input
                                className="input is-primary"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                            <input
                                className="input is-primary"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                            <button className="button is-primary is-normal is-outlined is-rounded">
                                Submit
                            </button>
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
