import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios'
import { Observable } from 'rxjs'

export interface RxiosConfig extends AxiosRequestConfig {
  localCache?: boolean
}

class Rxios {
  private httpClient: AxiosInstance

  constructor(private options: RxiosConfig = {}) {
    this.httpClient = axios.create(options)
  }

  public get<T>(url: string, config?: AxiosRequestConfig) {
    return this._makeRequest<T>('GET', url, config)
  }

  public post<T>(url: string, config?: AxiosRequestConfig) {
    return this._makeRequest<T>('POST', url, config)
  }

  public put<T>(url: string, config?: AxiosRequestConfig) {
    return this._makeRequest<T>('PUT', url, config)
  }

  public patch<T>(url: string, config?: AxiosRequestConfig) {
    return this._makeRequest<T>('PATCH', url, config)
  }

  public delete(url: string, config?: AxiosRequestConfig) {
    return this._makeRequest('DELETE', url, config)
  }

  private _makeRequest<T>(
    method: string,
    url: string,
    config?: AxiosRequestConfig,
  ) {
    let request: AxiosPromise<T>
    switch (method) {
      case 'GET':
        request = this.httpClient.get<T>(url, config)
        break
      case 'POST':
        request = this.httpClient.post<T>(url, null, config)
        break
      case 'PUT':
        request = this.httpClient.put<T>(url, config)
        break
      case 'PATCH':
        request = this.httpClient.patch<T>(url, config)
        break
      case 'DELETE':
        request = this.httpClient.delete(url, config)
        break
      default:
        throw new Error('Method is not supported')
    }
    return new Observable<T>(subscriber => {
      request
        .then(response => {
          subscriber.next(response.data)
          subscriber.complete()
        })
        .catch((err: Error) => {
          subscriber.error(err)
          subscriber.complete()
        })
    })
  }
}

export default Rxios
