import React from 'react'

import { Link } from 'react-router-dom'

import Login from '@src/components/Login'
import Register from '@src/components/Register'

import './styles.scss'

let showLogin = true;

function LandingPage() {

    function setToggle(value) {
        showLogin =  value === 'login' ? true : false;
    }

    return (
        <div id="LandingPage">
            <header>
                <div>{showLogin}</div>
                <Link to="/" onClick={() => setToggle('login')}>Login</Link>
                <Link to="/" onClick={() => setToggle('register')}>Register</Link>
            </header>
            <div className="body">
                <section className="section">
                    {showLogin ? <Login /> : <Register /> }

                </section>
            </div>
            <footer>
                <div>All rights reserve 2019</div>
            </footer>
        </div>
    )
}

export default LandingPage
