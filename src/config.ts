export interface IConfig {
    Api: string
}

const Config: IConfig = {
    Api: process.env.API_URL || 'http://localhost:5000',
}

export default Config
