import Axios, { AxiosResponse } from 'axios'

import Config from '@src/config'

import { handleError } from './'

import { IGroup } from '@src/services/groups'

export interface IResponse<T> {
    success: boolean
    data: T
    message?: string
    errors?: any
    error?: any
}

interface IEvent {
    auth_token: string
}

export async function createEventService(
    event_name: string,
    user_group_id: IGroup[],
    auth_token: string,
): Promise<IResponse<IEvent | null>> {
    try {
        const data = {
            event_name,
        }

        const request: AxiosResponse<IResponse<IEvent>> = await Axios.post(
            `${Config.Api}/user-events`,
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

export async function test(
    email: string,
): Promise<IResponse<IEvent | null>> {
    try {
        const data = {
            email,
        }

        const request: AxiosResponse<IResponse<IEvent>> = await Axios.post(
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
