import React, { useState } from 'react'

import { useCookies } from 'react-cookie'

import Input from '@components/Input'

import { createEventService } from '@src/services/event'

import './styles.scss'

import Alert from '@components/Alert'

import { IGroup, listGroups } from '@src/services/groups'

export interface ICreateEvent {
    event_name?: {
        message: string
    }
}

export interface ISendInvite {
    email?: {
        message: string
    }
}

function Events() {
    const [cookies] = useCookies(['Authorization', 'UserID'])

    const [create_event, setCreateEvent] = useState<boolean>(false)

    const [create_event_state, setCreateEventState] = useState<boolean>(false)

    const [event_name, setEventName] = useState<string>('')

    const [user_group_id, setUserGroupID] = useState<IGroup[]>([])

    const [create_field_errors, setCreateErrors] = useState<ICreateEvent>({})

    const [table_state, setTableState] = useState<boolean>(false)

    const [is_loading, setLoading] = useState<boolean>(false)

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
            setUserGroupID(data)
        } catch (e) {
            Alert(e.message, 'error')
        } finally {
            setLoading(false)
            setTableState(true)
        }
    }

    async function createEvent() {
        try {
            const { success, data, message, errors } = await createEventService(
                event_name,
                user_group_id,
                cookies['Authorization'],
            )
            if (!success || !data) {
                const create_error = {
                    message,
                    errors,
                }
                throw create_error
            }

            Alert(message || '', 'success')
            setCreateErrors({})
            setCreateEventState(true)
        } catch (e) {
            if (e.errors) {
                setCreateErrors(e.errors)
            } else {
                Alert(e.message, 'error')
            }
        } finally {
            setCreateEvent(false)
            setTableState(false)
        }
    }

    React.useEffect(() => {
        if (create_event_state) {
            window.location.assign('/Dashboard/Events')
        }

        if (!table_state) {
            setLoading(true)
            retrieveGroups()
        }

        if (create_event) {
            createEvent()
        }
    })

    const seedEvent = [
        {
            id: '3',
            name: 'First Event',
            group: 'group Sikat',
            date: 'November 24, 12:00 PM PST',
            location: 'Within Cebu City',
            restaurants: [
                { name: 'Bigbys', votes: 3 },
                { name: 'mcdo', votes: 1 },
            ],
        },
        {
            id: '1',
            name: 'The Second Ebento',
            group: 'Hilaw groip',
            date: 'November 26, 3:00 PM PST',
            location: 'Within Cebu City',
            restaurants: [
                { name: 'casav verd', votes: 2 },
                { name: 'yello cab', votes: 3 },
            ],
        },
        {
            id: '2',
            name: 'thrid G',
            group: 'Okey keyo Grp',
            date: 'December 5, 7:00 PM PST',
            location: 'Within Cebu City',
            restaurants: [
                { name: 'chowking', votes: 2 },
                { name: 'ucma', votes: 4 },
            ],
        },
    ]
    const [display_event, setDisplayEvent] = useState(seedEvent[0])

    return (
        <div id="Events">
            <div className="container">
                <div className="columns is-desktop">
                    <div className="column">
                        <div className="box create">
                            <p>Event Name</p>
                            <Input
                                field_error={create_field_errors.event_name}
                                label=""
                                type="text"
                                value={event_name}
                                onChange={e => setEventName(e.target.value)}
                                disabled={create_event}
                            />
                            <div className="field">
                                <div className="control">
                                    <div className="select is-info is-medium">
                                        <select>
                                            <option>Groups</option>
                                            {user_group_id.map(
                                                (item, index) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={item.id}
                                                        >
                                                            {item.group_name}
                                                        </option>
                                                    )
                                                },
                                            )}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <button
                                className="button is-primary is-info is-rounded"
                                disabled={is_loading}
                                onClick={e => {
                                    e.preventDefault()
                                    setCreateEvent(true)
                                }}
                            >
                                Create Event
                            </button>
                        </div>
                        <div className="box my-events">
                            <p>MY EVENTS</p>
                            <hr />
                            {seedEvent.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <div
                                            onClick={e => setDisplayEvent(item)}
                                        >
                                            <div className="box items">
                                                {item.name}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="column">
                        <div className="box display-event">
                            {display_event ? (
                                <div>
                                    <div className="name">
                                        {display_event.name}
                                    </div>
                                    <div className="date">
                                        {display_event.date}
                                    </div>
                                    <div className="location">
                                        {display_event.location}
                                    </div>
                                    <hr />
                                    <div className="columns is-desktop">
                                        <div className="column restaurant">
                                            <div className="title">
                                                Restaurants
                                            </div>
                                            {display_event.restaurants.map(
                                                (item, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <div>
                                                                {item.name}
                                                            </div>
                                                        </div>
                                                    )
                                                },
                                            )}
                                        </div>
                                        <div className="column votes">
                                            <div className="title">Votes</div>
                                            {display_event.restaurants.map(
                                                (item, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <div>
                                                                {item.votes}
                                                                <span className="vote-btn">
                                                                    -
                                                                </span>
                                                                <span className="vote-btn">
                                                                    +
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )
                                                },
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                    <div className="column">
                        <div className="box">test</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Events
