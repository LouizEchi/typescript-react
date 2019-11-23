import React from 'react'
interface IFieldError {
    message: string
}

interface IInputProps {
    field_error: IFieldError | undefined
    label: string
    type: string
    value: string
    onChange: (e: any) => void
    disabled: boolean
}

function Input(props: IInputProps) {
    return (
        <div>
            {props.field_error && props.field_error.message ? (
                <label className="form error">
                    <span>{props.field_error.message}</span>
                </label>
            ) : (
                <label className="form">
                    <span>{props.label}</span>
                </label>
            )}
            <input
                className="input is-primary"
                type={props.type}
                value={props.value}
                onChange={props.onChange}
                disabled={props.disabled}
            />
        </div>
    )
}

export default Input
