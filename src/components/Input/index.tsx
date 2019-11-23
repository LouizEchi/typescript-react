import React from 'react'
import { Form, InputProps } from 'react-bulma-components'

import './styles.scss'

interface IFieldError {
    message: string
}

interface IInputProps extends InputProps {
    field_error?: IFieldError | undefined
    label: string
    value: string
    onChange: (e: any) => void
    disabled?: boolean
    icon?: any
}

function Input(props: IInputProps) {
    const control_class = ['control']
    if (props.icon) {
        control_class.push('has-icons-left')
    }
    return (
        <div className="wiw-field field">
            {props.field_error && props.field_error.message ? (
                <label className="form error">
                    <span>{props.field_error.message}</span>
                </label>
            ) : (
                <label className="form">
                    <span>{props.label}</span>
                </label>
            )}
            <p className={control_class.join(' ')}>
                <Form.Input
                    className="input is-primary"
                    type={props.type}
                    value={props.value}
                    onChange={props.onChange}
                    disabled={props.disabled}
                />
                {props.icon ? (
                    <span className="icon is-small is-left">
                        <i className={props.icon} />
                    </span>
                ) : (
                    ''
                )}
            </p>
        </div>
    )
}

export default Input
