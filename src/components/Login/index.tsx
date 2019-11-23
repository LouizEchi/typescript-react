import React, { useState } from 'react'
import { useCookies } from 'react-cookie'

import logo from '@assets/wiw-logo.png'

import Alert from '@components/Alert'
import Input from '@components/Input'
import { loginService } from '@src/services/auth'

import { useLogin } from './states'

import './styles.scss'

export interface ILoginError {
    email?: {
        message: string
    }
    password?: {
        message: string
    }
}
function Login() {
    const [cookie, setCookies, removeCookies] = useCookies([])
    const [submit, setSubmit] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [field_errors, setErrors] = useState<ILoginError>({})
    const [login_state, setLoginState] = useState<boolean>(false)

    async function authenticate() {
        try {
            const { success, data, message, errors } = await loginService(
                email,
                password,
            )

            if (!success || !data) {
                throw {
                    message,
                    errors,
                }
            }

            removeCookies('Authorization')
            setCookies('Authorization', `Bearer ${data.auth_token}`)

            removeCookies('UserID')
            setCookies('UserID', data.user_id)

            Alert(message || '', 'success')
            setErrors({})
            setLoginState(true)
        } catch (e) {
            if (e.errors) {
                setErrors(e.errors)
            } else {
                Alert(e.message, 'error')
            }
        } finally {
            setSubmit(false)
        }
    }

    React.useEffect(() => {
        if (login_state || cookie['Authorization']) {
            window.location.assign('/Dashboard/Event')
        }

        if (submit) {
            setSubmit(false)
            authenticate()
        }
    })

    return (
        <div id="Login">
            <section className="section">
                <div className="box">
                    <div className="columns">
                        <div className="column is-full">
                            <img src={logo} className="App-logo" alt="logo" />
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column is-full">
                            <div className="columns">
                                <div className="column">
                                    <Input
                                        field_error={field_errors.email}
                                        label="Email"
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        disabled={submit}
                                    />
                                </div>
                            </div>
                            <div className="columns">
                                <div className="column">
                                    <Input
                                        field_error={field_errors.password}
                                        label="Password"
                                        type="password"
                                        value={password}
                                        onChange={e =>
                                            setPassword(e.target.value)
                                        }
                                        disabled={submit}
                                    />
                                </div>
                            </div>
                            <div className="columns">
                                <div className="column">
                                    <button
                                        className="button is-primary is-large is-fullwidth"
                                        onClick={e => {
                                            e.preventDefault()
                                            setSubmit(true)
                                        }}
                                    >
                                        Sign in
                                    </button>
                                </div>
                            </div>
                        </div>
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
