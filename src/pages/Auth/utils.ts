import jwtDecode from 'jwt-decode'
import { AZURE_BLOB_PATH } from 'src/shared/constants'
import { Payload } from './types'

export const getBackgroundUrl = () => {
  const backgrounds = [
    'login-bg-light.jpg',
    'login-bg-dark.jpg',
    'login-bg-deep-dark.png',
  ]
  const hour = new Date().getHours()
  let backgroundUrl = `${AZURE_BLOB_PATH}/`

  if (hour >= 6 && hour <= 17) {
    backgroundUrl += backgrounds[0]
  } else if (hour >= 18 && hour <= 22) {
    backgroundUrl += backgrounds[1]
  } else {
    backgroundUrl += backgrounds[2]
  }

  return backgroundUrl
}

export const decodeJWT = (token: string) => jwtDecode<Payload>(token)
