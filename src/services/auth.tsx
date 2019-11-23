import Axios, { AxiosResponse } from 'axios'

import Config from '@src/config'

import { handleError } from './'
export interface IResponse<T> {
    success: boolean
    data: T
    message?: string
    errors?: any
    error?: any
}

interface ILogin {
    auth_token: string
}

export async function loginService(
    email: string,
    password: string,
): Promise<IResponse<ILogin | null>> {
    try {
        const data = {
            email,
            password,
        }

        const request: AxiosResponse<IResponse<ILogin>> = await Axios.post(
            `${Config.Api}/auth/login`,
            data,
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            },
        )

        return request.data
    } catch (e) {
        return handleError(e)
    }
}
