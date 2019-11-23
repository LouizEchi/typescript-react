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
    retrieveGroupInvites,
} from '@src/services/groups'

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

function renderGroups(
    groups: IGroup[],
    user_id: number,
    filter: number,
    is_loading: boolean,
    setGroup: React.Dispatch<React.SetStateAction<number>>,
    setGroupRequest: React.Dispatch<React.SetStateAction<boolean>>,
    removeGroupHook: React.Dispatch<React.SetStateAction<number>>,
) {
    if (groups.length === 0) {
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

    return groups.map((group, idx) => {
        const group_class = ['box']
        if (filter === group.id) {
            group_class.push('is-active')
        }

        return (
            <div className="columns group-list" key={`key-${idx}-group`}>
                <div className="column is-full">
                    <div
                        className={group_class.join(' ')}
                        onClick={() => {
                            setGroupRequest(true)
                            setGroup(group.id)
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

function Groups() {
    const [cookies] = useCookies(['Authorization', 'UserID'])
    const [group_name, setGroups] = useState<string>('')
    const [user, setInviteUser] = useState<string>('')

    const [group_filter, setGroupFilter] = useState<number>(0)
    const [id_to_delete, removeGroupHook] = useState<number>(0)

    const [add_new, createNewGroup] = useState<boolean>(false)
    const [should_request, setGroupRequest] = useState<boolean>(false)
    const [table_state, setTableState] = useState<boolean>(false)
    const [is_loading, setLoading] = useState<boolean>(false)

    const [field_errors, setErrors] = useState<{
        [key: string]: IFieldError | undefined
    }>({})

    const [group_table, setGroupTableContent] = useState<IGroup[]>([])

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

            // setGroupTableContent(data)
        } catch (e) {
            Alert(e.message, 'error')
        } finally {
            setGroupRequest(false)
        }
    }

    React.useEffect(() => {
        if (!table_state) {
            setLoading(true)
            retrieveGroups()
        }

        if (should_request) {
            setLoading(true)
            retrieveInvites()
        }

        if (add_new) {
            setLoading(true)
            createNewGroup(false)
            addNewGroup()
        }

        if (id_to_delete > 0) {
            setLoading(true)
            removeGroupHook(0)
            removeGroup()
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
                            setGroupRequest,
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
                                        value={user}
                                        icon="fas fa-user-plus"
                                        onChange={e =>
                                            setInviteUser(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="column is-2 btn-container">
                                    <button className="button is-info">
                                        <i className="fas fa-plus" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Groups
