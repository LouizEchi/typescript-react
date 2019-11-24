import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { withRouter, Link } from 'react-router-dom'

import './styles.scss'

function Dashboard() {
    const cookieObject = useCookies(['Authorization', 'UserID'])
    const state = useState<boolean>(false)
    const cookie = cookieObject[0]
    const removeCookie = cookieObject[2]
    React.useEffect(() => {
        console.log('c', cookie)
        if (!cookie['Authorization']) {
            removeCookie('UserID', {
                path: '/',
            })
            removeCookie('Authorization', {
                path: '/',
            })
            window.location.assign('/')
        }
    })
    return (
        <nav
            id="Dashboard"
            className="navbar"
            role="navigation"
            aria-label="main navigation"
        >
            <div className="navbar-brand">
                <a className="navbar-item logo" href="/Dashboard/Event">
                    <i className="fas fa-cookie" />
                    <span>the cookie jar</span>
                </a>
                <div className="navbar-menu">
                    <div className="navbar-start">
                        <Link
                            className={
                                window.location.pathname === '/Dashboard/Events'
                                    ? 'navbar-item is-active'
                                    : 'navbar-item'
                            }
                            to={'/Dashboard/Events'}
                        >
                            <i className="fas fa-glass-cheers" />
                        </Link>

                        <Link
                            className={
                                window.location.pathname === '/Dashboard/Groups'
                                    ? 'navbar-item is-active'
                                    : 'navbar-item'
                            }
                            to={'/Dashboard/Groups'}
                        >
                            <i className="fas fa-users" />
                        </Link>

                        <Link
                            className={
                                window.location.pathname === '/Dashboard/Social'
                                    ? 'navbar-item is-active'
                                    : 'navbar-item'
                            }
                            to={'/Dashboard/Social'}
                        >
                            <i className="fas fa-comment" />
                        </Link>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <a
                                onClick={e => {
                                    e.preventDefault()
                                    removeCookie('UserID', {
                                        path: '/',
                                    })
                                    removeCookie('Authorization', {
                                        path: '/',
                                    })
                                    state[1](true)
                                }}
                            >
                                <i className="fas fa-sign-out-alt" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default withRouter(Dashboard)
