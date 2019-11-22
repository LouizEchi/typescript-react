import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import LandingPage from '@src/containers/LandingPage'

function Routes() {
    return (
        <div>
            <Router>
                <Route exact path="/" component={LandingPage} />
            </Router>
        </div>
    )
}

export default Routes
