import React from 'react'
import './styles.scss'

function Message() {
    return (
        <div id="Message">
            <article className="message is-success">
                <div className="message-body">Success</div>
            </article>
            {/* <article className="message is-danger">
                <div className="message-body">
                    Error
                </div>
            </article> */}
        </div>
    )
}

export default Message
