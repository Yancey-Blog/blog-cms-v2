import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'
import { Observable } from 'rxjs'
import { baseURL } from './constants'

const { CancelToken } = axios

// config timeout
axios.defaults.timeout = 30 * 1000

// config cookie
// axios.defaults.withCredentials = true;

// config request header
axios.defaults.headers.post['Content-Type'] = 'application/json'

// config base url
axios.defaults.baseURL =
  process.env.NODE_ENV === 'production'
    ? baseURL.production
    : baseURL.development

const pending: any[] = []
const removePending = (config: any) => {
  pending.forEach((p: any) => {
    if (p.u === `${config.url}&${config.method}`) {
      p.f()
      pending.splice(parseInt(p, 10), 1)
    }
  })
}

// config request interceptors
axios.interceptors.request.use(
  (config: any) => {
    removePending(config)
    // eslint-disable-next-line
    config.cancelToken = new CancelToken((c: any) => {
      pending.push({
        u: `${config.url}&${config.method}`,
        f: c,
      })
    })
    return config
  },
  (err: Error) => Promise.reject(err),
)
// config response interceptors
axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error && error.response) {
      const errorMsg = error.response.data.message
      console.log(errorMsg)
      if (error.response.status === 401) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error.message)
  },
)

// GET
export function GET<T>(url: string, params?: any): Observable<T> {
  return new Observable((subscriber: any) => {
    axios
      .get(url, {
        params,
      })
      .then((res: any) => {
        subscriber.next(res.data)
        subscriber.complete()
      })
      .catch((err: Error) => {
        subscriber.error(err)
        subscriber.complete()
      })
  })
}

// POST
export function POST<T>(
  url: string,
  params?: any,
  config?: AxiosRequestConfig,
): Observable<T> {
  return new Observable((subscriber: any) => {
    axios
      .post(url, params, config)
      .then((res: any) => {
        subscriber.next(res.data)
        subscriber.complete()
      })
      .catch((err: Error) => {
        subscriber.error(err)
        subscriber.complete()
      })
  })
}

// PUT
export function PUT<T>(url: string, params?: any): Observable<T> {
  return new Observable((subscriber: any) => {
    axios
      .put(url, params)
      .then((res: any) => {
        subscriber.next(res.data)
        subscriber.complete()
      })
      .catch((err: Error) => {
        subscriber.error(err)
        subscriber.complete()
      })
  })
}

// DELETE
export function DELETE<T>(url: string, params?: any): Observable<T> {
  return new Observable((subscriber: any) => {
    axios
      .delete(url, {
        data: params,
      })
      .then((res: any) => {
        subscriber.next(res.data)
        subscriber.complete()
      })
      .catch((err: Error) => {
        subscriber.error(err)
        subscriber.complete()
      })
  })
}
