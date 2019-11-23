import axios from 'axios'
import Config from '@src/config'

export default axios.create({
    baseURL: Config.Api,
    responseType: 'json',
    timeout: 4000,
})
