import { useState } from 'react'

export function useRegister() {
    const [showRegister, setShow] = useState(false)

    function toggleRegister() {
        setShow(!showRegister)
    }

    return {
        showRegister,
        toggleRegister,
    }
}
