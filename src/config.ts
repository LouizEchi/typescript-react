export interface IConfig {
    Api: string
}

const Config: IConfig = {
    Api:
        process.env.API_URL ||
        'http://ec2-18-140-3-35.ap-southeast-1.compute.amazonaws.com',
}

export default Config
