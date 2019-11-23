export function handleError(e: any) {
    if (e.response && e.response.status === 400) {
        return {
            success: false,
            data: null,
            message: e.response.data.message,
            errors: e.response.data.errors,
        }
    }

    return {
        success: false,
        data: null,
        error: JSON.stringify(e),
    }
}
