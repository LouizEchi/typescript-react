import React from 'react'
import { withRouter, Link } from 'react-router-dom'

import Events from '@src/components/Events'

function Dashboard() {
    return (
        <div id="Dashboard">
            <div className="tabs is-centered is-boxed">
                <ul>
                    <li
                        className={
                            window.location.pathname === '/Dashboard/Event'
                                ? 'is-active'
                                : ''
                        }
                    >
                        <Link to={'/Dashboard/Event'}>Event</Link>
                    </li>
                    <li
                        className={
                            window.location.pathname === '/Dashboard/Groups'
                                ? 'is-active'
                                : ''
                        }
                    >
                        <Link to={'/Dashboard/Groups'}>Groups</Link>
                    </li>
                    <li
                        className={
                            window.location.pathname === '/Dashboard/Friends'
                                ? 'is-active'
                                : ''
                        }
                    >
                        <Link to={'/Dashboard/Friends'}>Friends</Link>
                    </li>
                </ul>
            </div>
            {window.location.pathname === '/Dashboard/Event' ? <Events /> : ''}
        </div>
    )
}

export default withRouter(Dashboard)
