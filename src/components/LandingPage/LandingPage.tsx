import React from 'react';
import logo from '../../wiw-logo.png';
import './LandingPage.scss';

import Login from '../../constants/Login/Login';
import useLogin from '../../constants/Login/useLogin';
import Register from '../../constants/Register/Register';
import useRegister from '../../constants/Register/useRegister';

function LandingPage() {
    let {showLogin, toggleLogin} = useLogin();
    let {showRegister, toggleRegister} = useRegister();
    
    return (
        <div id="LandingPage">
            <header>
                <button disabled={showRegister} className="login" onClick={toggleLogin}>login</button>
                <button disabled={showLogin} className="register" onClick={toggleRegister}>register</button>
            </header>
            <div className="body">
                <img src={logo} className="App-logo" alt="logo" />
            </div>
            <footer>
                <div>All rights reserve 2019</div>
            </footer>
            <Login show={showLogin} hide={toggleLogin}/>
            <Register show={showRegister} hide={toggleRegister}/>
        </div>
    );
}

export default LandingPage;
