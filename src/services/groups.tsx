import Axios, { AxiosResponse } from 'axios'

import Config from '@src/config'

import { handleError } from './'
import { IResponse } from './types'

export interface IUser {
    id: number
    email: string
    first_name: string
    last_name: string
}

export interface IGroup {
    id: number

    group_name: string

    created_at: Date

    updated_at?: Date

    owner: IUser

    members: IUser[]
}

export async function addGroupService(
    group_name: string,
    token: string,
): Promise<IResponse<IGroup[] | null>> {
    try {
        const request: AxiosResponse<IResponse<IGroup[]>> = await Axios.post(
            `${Config.Api}/user-groups`,
            {
                group_name,
            },
            {
                headers: {
                    Authorization: token,
                    'Access-Control-Allow-Origin': '*',
                },
            },
        )

        return request.data
    } catch (e) {
        return handleError(e)
    }
}

export async function removeGroupService(
    id: number,
    token: string,
): Promise<IResponse<IGroup[] | null>> {
    try {
        const request: AxiosResponse<IResponse<IGroup[]>> = await Axios.delete(
            `${Config.Api}/user-groups/${id}`,
            {
                headers: {
                    Authorization: token,
                    'Access-Control-Allow-Origin': '*',
                },
            },
        )

        return request.data
    } catch (e) {
        return handleError(e)
    }
}

export async function listGroups(
    token: string,
): Promise<IResponse<IGroup[] | null>> {
    try {
        const request: AxiosResponse<IResponse<IGroup[]>> = await Axios.get(
            `${Config.Api}/user-groups`,
            {
                headers: {
                    Authorization: token,
                    'Access-Control-Allow-Origin': '*',
                },
            },
        )

        return request.data
    } catch (e) {
        return handleError(e)
    }
}
