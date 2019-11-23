import { toast, ToastOptions } from 'react-toastify'

function Alert(message: string, type: string, options: ToastOptions = {}) {
    if (!options.position) {
        options.position = toast.POSITION.BOTTOM_RIGHT
    }
    switch (type) {
        case 'error':
            toast.error(message, options)
            break
        case 'warn':
            toast.warn(message, options)
            break
        case 'success':
            toast.success(message, options)
            break
        case 'info':
            toast.info(message, options)
        default:
            toast(message, options)
    }
}

export default Alert
