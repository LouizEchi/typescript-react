import React, { useState } from 'react'
import { useCookies } from 'react-cookie'

import { Loader } from 'react-bulma-components'

import Alert from '@src/components/Alert'
import Input, { IFieldError } from '@components/Input'

import {
    IGroup,
    addGroupService,
    listGroups,
    removeGroupService,
} from '@src/services/groups'

import {
    IGroupInvite,
    addGroupInviteService,
    retrieveGroupInvites,
    removeGroupInviteService,
} from '@src/services/group-invites'

import './styles.scss'

// function renderModel(
//     group: IGroup,
//     setModalState: React.Dispatch<React.SetStateAction<boolean>>,
//     setNewGroup: React.Dispatch<React.SetStateAction<IGroup | null>>,
//     submitState: React.Dispatch<React.SetStateAction<boolean>>,
// ) {
//     return (
//         <div className="modal is-active">
//             <div className="modal-background"></div>
//             <div className="modal-content">
//                 <div className="columns">
//                     <div className="column is-10-desktop is-8-table is-10-mobile">
//                         <Input
//                             type="text"
//                             label="Group Name"
//                             value={group.group_name || ''}
//                             icon="fas fa-signature"
//                             onChange={e => {
//                                 group.group_name = e.target.value
//                                 setNewGroup(group)
//                             }}
//                         />
//                     </div>
//                     <div className="column is-2 btn-container">
//                         <button className="button is-info">Add</button>
//                     </div>
//                 </div>
//             </div>
//             <button
//                 className="modal-close is-large"
//                 aria-label="close"
//                 onClick={() => setModalState(false)}
//             ></button>
//         </div>
//     )
// }

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

function renderGroups(
    groups: IGroup[],
    user_id: number,
    filter: number,
    is_loading: boolean,
    setGroup: React.Dispatch<React.SetStateAction<number>>,
    setInviteTableState: React.Dispatch<React.SetStateAction<boolean>>,
    removeGroupHook: React.Dispatch<React.SetStateAction<number>>,
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

    if (groups.length === 0) {
        return renderEmpty(
            `You don't own or belong to any group. Create your first group now!`,
        )
    }

    return groups.map((group, idx) => {
        const group_class = ['box']
        console.log(filter === group.id, filter)
        if (filter === group.id) {
            group_class.push('is-active')
        }

        return (
            <div className="columns group-list" key={`key-${idx}-group`}>
                <div className="column is-full">
                    <div
                        className={group_class.join(' ')}
                        onClick={() => {
                            if (group.id !== filter) {
                                setInviteTableState(true)
                                setGroup(group.id)
                            }
                        }}
                    >
                        <span className="columns">
                            <div className="column is-full group-label">
                                <label>Group ID:</label>
                                <span>{group.id}</span>
                            </div>
                        </span>

                        <span className="columns">
                            <div className="column is-full group-label">
                                <label>Group Name:</label>
                                <span>{group.group_name}</span>
                            </div>
                        </span>

                        <span className="columns">
                            <div className="column is-full group-label">
                                <label>Member Count:</label>
                                <span>{group.members.length}</span>
                            </div>
                        </span>

                        {group.owner && group.owner.id === user_id ? (
                            <span className="columns">
                                <div className="column is-2 group-label">
                                    <button
                                        className="button is-danger"
                                        disabled={is_loading}
                                        onClick={() => {
                                            removeGroupHook(group.id)
                                        }}
                                    >
                                        <span>Remove</span>
                                    </button>
                                </div>
                                <div className="column is-offset-8 is-2 group-label">
                                    <label className="group-is-owner">
                                        OWNER
                                    </label>
                                </div>
                            </span>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>
        )
    })
}

function renderGroupInvites(
    invites: IGroupInvite[],
    group_filter: number,
    is_loading: boolean,
    removeGroupInviteHook: React.Dispatch<React.SetStateAction<number>>,
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

    if (invites.length === 0 && group_filter > 0) {
        return renderEmpty(`Get started by inviting some of your friends!`)
    }

    return invites.map((invite, idx) => {
        const group_class = ['box', 'invite']

        return (
            <div className="columns group-list" key={`key-${idx}-group`}>
                <div className="column is-full">
                    <div className={group_class.join(' ')}>
                        <span className="columns">
                            <div className="column is-full invite-label">
                                <label>Invitation ID:</label>
                                <span>{invite.id}</span>
                            </div>
                        </span>

                        <span className="columns">
                            <div className="column is-full invite-label">
                                <label>Name:</label>
                                <span>
                                    {invite.user_id.first_name}{' '}
                                    {invite.user_id.last_name}
                                </span>
                            </div>
                        </span>

                        <span className="columns">
                            <div className="column is-full invite-label">
                                <label>Email:</label>
                                <span className="email">
                                    {invite.user_id.email}
                                </span>
                            </div>
                        </span>

                        <span className="columns">
                            <div className="column is-2 invite-label">
                                {invite.status === 'Pending' ? (
                                    <button
                                        className="button is-info"
                                        disabled={is_loading}
                                        onClick={() => {
                                            removeGroupInviteHook(invite.id)
                                        }}
                                    >
                                        <span>Cancel Invite</span>
                                    </button>
                                ) : (
                                    ''
                                )}
                            </div>
                            <div className="column is-offset-8 is-2 invite-label">
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
    const [group_name, setGroups] = useState<string>('')

    const [group_filter, setGroupFilter] = useState<number>(0)
    const [id_to_delete, removeGroupHook] = useState<number>(0)

    const [add_new, createNewGroup] = useState<boolean>(false)

    const [table_state, setTableState] = useState<boolean>(false)
    const [is_loading, setLoading] = useState<boolean>(false)

    const [group_table, setGroupTableContent] = useState<IGroup[]>([])

    // Invite Related
    const [invite_email, setInviteEmail] = useState<string>('')

    const [invite_id_to_delete, removeGroupInviteHook] = useState<number>(0)

    const [table_invite_state, setInviteTableState] = useState<boolean>(false)
    const [invite_email_request, sendEmailInvite] = useState<boolean>(false)
    const [is_invite_loading, setInviteLoading] = useState<boolean>(false)

    const [invite_table, setInviteTableContent] = useState<IGroupInvite[]>([])

    const [field_errors, setErrors] = useState<{
        [key: string]: IFieldError | undefined
    }>({})

    const addNewGroup = async () => {
        try {
            const { success, data, message, errors } = await addGroupService(
                group_name,
                cookies['Authorization'],
            )

            if (!success || !data) {
                throw {
                    message,
                    errors,
                }
            }

            setGroupTableContent([])
            if (message) {
                Alert(message, 'success')
            }
        } catch (e) {
            if (e.errors) {
                setErrors(e.errors)
            }
            Alert(e.message, 'error')
        } finally {
            setTableState(false)
            setLoading(false)
        }
    }

    const removeGroup = async () => {
        try {
            const { success, data, message, errors } = await removeGroupService(
                id_to_delete,
                cookies['Authorization'],
            )

            if (!success || !data) {
                throw {
                    message,
                    errors,
                }
            }

            setGroupTableContent([])
            if (message) {
                Alert(message, 'success')
            }
        } catch (e) {
            if (e.errors) {
                setErrors(e.errors)
            }
            Alert(e.message, 'error')
        } finally {
            setTableState(false)
            setLoading(false)
        }
    }

    const retrieveGroups = async () => {
        try {
            const { success, data, message, errors } = await listGroups(
                cookies['Authorization'],
            )

            if (!success || !data) {
                throw {
                    message,
                    errors,
                }
            }

            setGroupTableContent(data)
        } catch (e) {
            Alert(e.message, 'error')
        } finally {
            setTableState(true)
            setLoading(false)
        }
    }

    // Invite
    const retrieveInvites = async () => {
        try {
            const {
                success,
                data,
                message,
                errors,
            } = await retrieveGroupInvites(
                group_filter,
                cookies['Authorization'],
            )

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

    const sendEmailInvites = async () => {
        try {
            const {
                success,
                data,
                message,
                errors,
            } = await addGroupInviteService(
                invite_email,
                group_filter,
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

    const cancelGroupInvite = async () => {
        try {
            removeGroupInviteHook(0)
            const {
                success,
                data,
                message,
                errors,
            } = await removeGroupInviteService(
                invite_id_to_delete,
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
            if (e.errors) {
                setErrors(e.errors)
            }
            Alert(e.message, 'error')
        } finally {
            setInviteLoading(false)
            setInviteTableState(true)
        }
    }

    React.useEffect(() => {
        if (!table_state) {
            setLoading(true)
            retrieveGroups().then()
        }

        if (add_new) {
            setLoading(true)
            createNewGroup(false)
            addNewGroup().then()
        }

        if (id_to_delete > 0) {
            setLoading(true)
            removeGroupHook(0)
            removeGroup().then()
        }

        if (table_invite_state) {
            setInviteLoading(true)
            setInviteTableState(false)
            retrieveInvites().then()
        }

        if (invite_email_request) {
            setInviteLoading(true)
            sendEmailInvite(false)
            sendEmailInvites().then()
        }

        if (invite_id_to_delete > 0) {
            setInviteLoading(true)
            cancelGroupInvite().then()
        }
    })

    return (
        <div id="Groups">
            <div className="container">
                <div className="columns">
                    <div className="column is-half-desktop is-full-mobile">
                        <div className="box">
                            <div className="columns">
                                <div className="column is-11-desktop is-8-table is-10-mobile">
                                    <Input
                                        type="text"
                                        field_error={field_errors.group_name}
                                        label="Group Name"
                                        value={group_name || ''}
                                        icon="fas fa-signature"
                                        onChange={e =>
                                            setGroups(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="column is-2 btn-container">
                                    <button
                                        className="button is-danger"
                                        disabled={is_loading}
                                        onClick={() => {
                                            createNewGroup(true)
                                        }}
                                    >
                                        <i className="fas fa-plus" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        {renderGroups(
                            group_table,
                            Number(cookies['UserID']),
                            group_filter,
                            is_loading,
                            setGroupFilter,
                            setInviteTableState,
                            removeGroupHook,
                        )}
                    </div>
                    <div className="column is-half-desktop is-full-mobile">
                        <div className="box">
                            <div className="columns">
                                <div className="column is-11-desktop is-8-table is-10-mobile">
                                    <Input
                                        type="text"
                                        field_error={field_errors.invites}
                                        label="Invites"
                                        value={invite_email}
                                        icon="fas fa-user-plus"
                                        onChange={e =>
                                            setInviteEmail(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="column is-2 btn-container">
                                    <button
                                        className="button is-info"
                                        onClick={() => {
                                            sendEmailInvite(true)
                                        }}
                                        disabled={
                                            group_filter === 0 ||
                                            is_loading ||
                                            is_invite_loading
                                        }
                                    >
                                        <i className="fas fa-plus" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        {renderGroupInvites(
                            invite_table,
                            group_filter,
                            is_invite_loading,
                            removeGroupInviteHook,
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Groups
