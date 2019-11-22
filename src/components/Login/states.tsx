import { useState } from 'react'

export function useLogin() {
    const [showLogin, setShow] = useState(false)

    function toggleLogin() {
        setShow(!showLogin)
    }

    return {
        showLogin,
        toggleLogin,
    }
}
