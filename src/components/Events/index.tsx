import React, { useState } from 'react'
import './styles.scss'

function Events() {
    const [event, setEvent] = useState<string>('')

    return (
        <div id="Events">
            <div className="container">
                <div className="box">
                    <p>Event Name</p>
                    <input
                        className="input is-primary"
                        type="event"
                        value={event}
                        onChange={e => setEvent(e.target.value)}
                        placeholder="Event"
                    />
                </div>
                <div className="box invite">
                    <p>Send Invites</p>
                    <input
                        className="input is-primary"
                        type="event"
                        value={event}
                        onChange={e => setEvent(e.target.value)}
                        placeholder="Event"
                    />
                    <button className="button is-primary is-dark is-rounded">
                        Add
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Events
