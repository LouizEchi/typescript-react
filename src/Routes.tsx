import React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import LandingPage from '@src/containers/LandingPage'

import Dashboard from '@src/containers/Dashboard'

import Social from '@src/containers/Social'

import Events from '@src/components/Events'

import Groups from '@src/containers/Groups'

function Routes() {
    return (
        <div>
            <Router>
                <Route exact path="/" component={LandingPage} />
                <Route path="/Dashboard" component={Dashboard} />
                <Route path="/Dashboard/Events" component={Events} />
                <Route path="/Dashboard/Groups" component={Groups} />
                <Route path="/Dashboard/Social" component={Social} />
            </Router>
        </div>
    )
}

export default Routes
