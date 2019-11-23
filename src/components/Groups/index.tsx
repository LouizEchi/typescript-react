import React, { useState } from 'react'
import './styles.scss'

function Groups() {
    const [event, setEvent] = useState<string>('')

    return (
        <div id="Groups">
            <div className="container">
                <div className="box">
                    <p>Groups</p>
                    <input
                        className="input is-primary"
                        type="event"
                        value={event}
                        onChange={e => setEvent(e.target.value)}
                        placeholder="Event"
                    />
                </div>
                <div className="box invite">
                    <p>Groups</p>
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

export default Groups
