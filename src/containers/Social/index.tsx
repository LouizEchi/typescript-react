import React, { useState } from 'react'
import { useCookies } from 'react-cookie'

import { Loader } from 'react-bulma-components'

import Alert from '@src/components/Alert'

import {
    IGroupInvite,
    acceptGroupInviteService,
    retrieveInviteService,
    declineGroupInviteService,
} from '@src/services/group-invites'

import './styles.scss'

function renderEmpty(message: string) {
    return (
        <div className="box">
            <div className="columns">
                <div className="column is-full">
                    <label>{message}</label>
                </div>
            </div>
        </div>
    )
}

function renderGroupInvites(
    invites: IGroupInvite[],
    is_loading: boolean,
    acceptGroupInviteHook: React.Dispatch<React.SetStateAction<number>>,
    declineGroupInviteHook: React.Dispatch<React.SetStateAction<number>>,
) {
    if (is_loading) {
        return (
            <div style={{ margin: 'auto' }}>
                <Loader
                    style={{
                        fontSize: '5rem',
                        margin: 'auto',
                    }}
                />
            </div>
        )
    }

    if (invites.length === 0) {
        return renderEmpty(`It may be empty now, but it's only the beginning!`)
    }

    return invites.map((invite, idx) => {
        const group_class = ['box', 'invite']

        return (
            <div className="columns group-list" key={`key-${idx}-group`}>
                <div className="column is-full">
                    <div className={group_class.join(' ')}>
                        <span className="columns">
                            <div className="column is-half invite-label">
                                <label>Invitation ID:</label>
                                <span>{invite.id}</span>
                            </div>

                            <div className="column is-half invite-label">
                                <label>Group ID:</label>
                                <span>{invite.user_group_id.id}</span>
                            </div>
                        </span>

                        <span className="columns">
                            <div className="column is-half invite-label">
                                <label>Invited By:</label>
                                {invite.user_group_id.owner ? (
                                    <span>
                                        {invite.user_group_id.owner.first_name}{' '}
                                        {invite.user_group_id.owner.last_name}
                                    </span>
                                ) : (
                                    ''
                                )}
                            </div>

                            <div className="column is-half invite-label">
                                <label>Group Name:</label>
                                <span>{invite.user_group_id.group_name}</span>
                            </div>
                        </span>

                        <span className="columns">
                            <div className="column is-full invite-label">
                                <label>Email:</label>
                                <span className="email">
                                    {invite.user_group_id.owner.email}{' '}
                                </span>
                            </div>
                        </span>

                        <span className="columns">
                            <div className="column is-10 invite-label">
                                {invite.status === 'Pending' ? (
                                    <div className="columns">
                                        <div className="column is-2 btn-invite-container">
                                            <button
                                                className="button is-info"
                                                disabled={is_loading}
                                                onClick={() => {
                                                    declineGroupInviteHook(
                                                        invite.id,
                                                    )
                                                }}
                                            >
                                                <span>Decline</span>
                                            </button>
                                        </div>
                                        <div className="column is-2 btn-invite-container">
                                            <button
                                                className="button is-danger"
                                                disabled={is_loading}
                                                onClick={() => {
                                                    acceptGroupInviteHook(
                                                        invite.id,
                                                    )
                                                }}
                                            >
                                                <span>Accept</span>
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>
                            <div className="column  is-2 invite-label">
                                <label className="group-is-owner">
                                    {invite.status}
                                </label>
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        )
    })
}

function Groups() {
    const [cookies] = useCookies(['Authorization', 'UserID'])

    // Invite Related
    const [invite_id_to_accept, acceptGroupInviteHook] = useState<number>(0)
    const [invite_id_to_decline, declineGroupInviteHook] = useState<number>(0)

    const [table_invite_state, setInviteTableState] = useState<boolean>(true)
    const [is_invite_loading, setInviteLoading] = useState<boolean>(false)

    const [invite_table, setInviteTableContent] = useState<IGroupInvite[]>([])

    // Invite
    const retrieveInvites = async () => {
        try {
            const {
                success,
                data,
                message,
                errors,
            } = await retrieveInviteService(cookies['Authorization'])

            if (!success || !data) {
                throw {
                    message,
                    errors,
                }
            }

            setInviteTableContent(data)
        } catch (e) {
            Alert(e.message, 'error')
        } finally {
            setInviteLoading(false)
            setInviteTableState(false)
        }
    }

    const acceptGroupInvite = async () => {
        try {
            acceptGroupInviteHook(0)
            const {
                success,
                data,
                message,
                errors,
            } = await acceptGroupInviteService(
                invite_id_to_accept,
                cookies['Authorization'],
            )

            if (!success || !data) {
                throw {
                    message,
                    errors,
                }
            }

            if (message) {
                Alert(message, 'success')
            }
            setInviteTableContent([])
        } catch (e) {
            Alert(e.message, 'error')
        } finally {
            setInviteLoading(false)
            setInviteTableState(true)
        }
    }

    const declineGroupInvite = async () => {
        try {
            declineGroupInviteHook(0)
            const {
                success,
                data,
                message,
                errors,
            } = await declineGroupInviteService(
                invite_id_to_decline,
                cookies['Authorization'],
            )

            if (!success || !data) {
                throw {
                    message,
                    errors,
                }
            }

            if (message) {
                Alert(message, 'success')
            }
            setInviteTableContent([])
        } catch (e) {
            Alert(e.message, 'error')
        } finally {
            setInviteLoading(false)
            setInviteTableState(true)
        }
    }

    React.useEffect(() => {
        if (table_invite_state) {
            setInviteLoading(true)
            setInviteTableState(false)
            retrieveInvites().then()
        }

        if (invite_id_to_accept > 0) {
            setInviteLoading(true)
            acceptGroupInvite().then()
        }

        if (invite_id_to_decline > 0) {
            setInviteLoading(true)
            declineGroupInvite().then()
        }
    })

    return (
        <div id="Social">
            <div className="container">
                <div className="columns">
                    <div className="column is-half-desktop is-full-mobile">
                        <div className="box">
                            <div className="columns">
                                <div className="column is-11-desktop is-8-table is-10-mobile">
                                    <label className="header">Food Mail</label>
                                </div>
                            </div>
                        </div>
                        {renderGroupInvites(
                            invite_table,
                            is_invite_loading,
                            acceptGroupInviteHook,
                            declineGroupInviteHook,
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Groups
