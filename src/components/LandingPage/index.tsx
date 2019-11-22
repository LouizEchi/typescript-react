import React from 'react'

import logo from '@assets/wiw-logo.png'

import Login from '@constants/Login/Login'
import Register from '@constants/Register/Register'

import useLogin from '@constants/Login/useLogin'
import useRegister from '@constants/Register/useRegister'

import './LandingPage.scss'

function LandingPage() {
    const { showLogin, toggleLogin } = useLogin()
    const { showRegister, toggleRegister } = useRegister()

    return (
        <div id="LandingPage">
            <header>
                <button
                    disabled={showRegister}
                    className="login"
                    onClick={toggleLogin}
                >
                    login
                </button>
                <button
                    disabled={showLogin}
                    className="register"
                    onClick={toggleRegister}
                >
                    register
                </button>
            </header>
            <div className="body">
                <img src={logo} className="App-logo" alt="logo" />
            </div>
            <footer>
                <div>All rights reserve 2019</div>
            </footer>
            <Login show={showLogin} hide={toggleLogin} />
            <Register show={showRegister} hide={toggleRegister} />
        </div>
    )
}

export default LandingPage
