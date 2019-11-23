import Axios, { AxiosResponse } from 'axios'

import Config from '@src/config'

import { handleError } from './'
import { IResponse } from './types'
import { IGroup } from './groups'

export interface IUser {
    id: number
    email: string
    first_name: string
    last_name: string
}

export interface IGroupInvite {
    id: number

    user_id: IUser

    user_group_id: IGroup

    status: string
}

export async function addGroupInviteService(
    email: string,
    user_group_id: number,
    token: string,
): Promise<IResponse<IGroupInvite[] | null>> {
    try {
        const request: AxiosResponse<IResponse<
            IGroupInvite[]
        >> = await Axios.post(
            `${Config.Api}/user-group-invites`,
            {
                email,
                user_group_id,
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

export async function removeGroupInviteService(
    id: number,
    token: string,
): Promise<IResponse<IGroupInvite[] | null>> {
    try {
        const request: AxiosResponse<IResponse<
            IGroupInvite[]
        >> = await Axios.put(
            `${Config.Api}/user-group-invites/cancel/${id}`,
            {},
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

export async function retrieveGroupInvites(
    group_id: number,
    token: string,
): Promise<IResponse<IGroupInvite[] | null>> {
    try {
        const request: AxiosResponse<IResponse<
            IGroupInvite[]
        >> = await Axios.get(
            `${Config.Api}/user-group-invites/${group_id}/by-group-id`,
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
