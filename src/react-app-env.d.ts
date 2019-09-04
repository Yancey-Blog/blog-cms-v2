/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

import { RouterAction } from 'connected-react-router'
import { ActionType, StateType } from 'typesafe-actions'

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly PUBLIC_URL: string
  }
}

declare module '*.bmp' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.webp' {
  const src: string
  export default src
}

declare module '*.svg' {
  import * as React from 'react'

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >

  const src: string
  export default src
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module 'typesafe-actions' {
  export type RootStore = StateType<typeof import('stores/rootStores').default>
  export type RootState = StateType<
    typeof import('stores/rootReducers').default
  >
  export type RootAction =
    | ActionType<typeof import('stores/rootActions').default>
    | RouterAction
  export type Services = typeof import('services').default

  interface Types {
    RootAction: RootAction
    RootState: RootState
    Services: Services
  }
}
