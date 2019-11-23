import Axios, { AxiosResponse } from 'axios'

import Config from '@src/config'

import { IResponse } from './types'

import { handleError } from './'

interface ILogin {
    user_id: number
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
