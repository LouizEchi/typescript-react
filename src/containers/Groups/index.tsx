import React, { useState } from 'react'
import { useCookies } from 'react-cookie'

import { Loader } from 'react-bulma-components'

import Alert from '@src/components/Alert'
import Input from '@components/Input'

import { IGroup, listGroups, retrieveGroupInvites } from '@src/services/groups'

import './styles.scss'

function renderGroups(
    groups: IGroup[],
    user_id: number,
    setGroup: React.Dispatch<React.SetStateAction<number>>,
    setGroupRequest: React.Dispatch<React.SetStateAction<boolean>>,
    filter: number,
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
                            <div className="column is-full">
                                <label className="group-label">
                                    Group Name:
                                </label>
                                <span>{group.group_name}</span>
                            </div>
                        </span>

                        <span className="columns">
                            <div className="column is-full">
                                <label className="group-label">
                                    Member Count:
                                </label>
                                <span>{group.members.length}</span>
                            </div>
                        </span>

                        {group.owner && group.owner.id === user_id ? (
                            <span className="columns">
                                <div className="column is-full">
                                    <label className="group-label group-is-owner">
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
    const [event, setGroups] = useState<string>('')
    const [user, setInviteUser] = useState<string>('')

    const [group_filter, setGroupFilter] = useState<number>(0)
    const [should_request, setGroupRequest] = useState<boolean>(false)

    const [table_state, setTableState] = useState<boolean>(false)

    const [group_table, setGroupTableContent] = useState<IGroup[]>([])
    const [cookies] = useCookies(['Authorization'])

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
            retrieveGroups()
        }

        if (should_request) {
            retrieveInvites()
        }
    })

    return (
        <div id="Groups">
            <div className="container">
                <div className="columns">
                    <div className="column is-half-desktop is-full-mobile">
                        <div className="box">
                            <Input
                                type="text"
                                label="Group"
                                value={event}
                                onChange={e => setGroups(e.target.value)}
                            />
                        </div>
                        {renderGroups(
                            group_table,
                            cookies['UserID'],
                            setGroupFilter,
                            setGroupRequest,
                            group_filter,
                        )}
                    </div>
                    <div className="column is-half-desktop is-full-mobile">
                        <div className="box">
                            <div className="columns">
                                <div className="column is-10-desktop is-8-table is-10-mobile">
                                    <Input
                                        type="text"
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
                                        Add
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
