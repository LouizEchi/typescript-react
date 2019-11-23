import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import Routes from './Routes'

import 'react-toastify/dist/ReactToastify.css'

const App: React.FC = () => {
    toast.configure()
    return (
        <div className="App">
            <ToastContainer />
            <Router>
                <Switch>
                    <Routes />
                </Switch>
            </Router>
        </div>
    )
}

export default App
