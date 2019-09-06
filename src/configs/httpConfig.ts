import { AxiosRequestConfig } from 'axios'
import Rxios from 'shared/rxios'
import { baseURL } from 'shared/constants'

const env = process.env.NODE_ENV

const AXIOS_DEFAULT_CONFIG: AxiosRequestConfig = {
  timeout: 5000,
  validateStatus: status => status >= 200 && status < 300,
}

const apiUrl = () =>
  env === 'production' ? baseURL.production : baseURL.development

const createRxios = function(baseURL: string) {
  return new Rxios({
    ...AXIOS_DEFAULT_CONFIG,
    baseURL,
  })
}

export default createRxios(apiUrl())
