import React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import LandingPage from '@src/containers/LandingPage'

import Dashboard from '@src/containers/Dashboard'

import Events from '@src/components/Events'

import Groups from '@src/components/Groups'

import Friends from '@src/components/Friends'

function Routes() {
    return (
        <div>
            <Router>
                <Route exact path="/" component={LandingPage} />
                <Route path="/Dashboard" component={Dashboard} />
                <Route path="/Dashboard/Events" component={Events} />
                <Route path="/Dashboard/Groups" component={Groups} />
                <Route path="/Dashboard/Friends" component={Friends} />
            </Router>
        </div>
    )
}

export default Routes
