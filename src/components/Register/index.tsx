import API from '../../API'

import React, { useState } from 'react'

import { useRegister } from './states'

import Message from '@src/components/Message'

import logo from '@assets/wiw-logo.png'

import './styles.scss'

function Register() {
    const [showMessage, setShowMessage] = useState(false)
    const [first_name, setFirstname] = useState<string>('')
    const [last_name, setLastname] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [company, setCompany] = useState<string>('')

    async function handleSubmit(event: any) {
        event.preventDefault()
        const data = {
            first_name,
            last_name,
            email,
            password,
            company
        }

        await API.post('/register', data).then((response) => {
            if (response.status === 200) {
                setShowMessage(true)
                setInterval(timer, 2000)
            } else {
                setShowMessage(false)
            }
        })

        function timer() {
            setShowMessage(false)
            window.location.reload()
        }
    }

    return (
        <div id="Register">
            {showMessage ? <Message /> : ''}
            <section className="section">
                <div className="box">
                    <div>
                        <div>
                            <img src={logo} className="App-logo" alt="logo" />
                        </div>
                        <p>Register</p>
                        <form onSubmit={handleSubmit}>
                            <input
                                className="input is-primary"
                                type="firstname"
                                value={first_name}
                                onChange={e => setFirstname(e.target.value)}
                                placeholder="First Name"
                            />
                            <input
                                className="input is-primary"
                                type="lastname"
                                value={last_name}
                                onChange={e => setLastname(e.target.value)}
                                placeholder="Last Name"
                            />
                            <input
                                className="input is-primary"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="email"
                            />
                            <input
                                className="input is-primary"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="password"
                            />
                            <input
                                className="input is-primary"
                                type="company"
                                value={company}
                                onChange={e => setCompany(e.target.value)}
                                placeholder="company"
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
    useRegister,
}

export default Register
