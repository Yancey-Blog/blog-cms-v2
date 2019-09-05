import { StateType, ActionType } from 'typesafe-actions'
import { RouterAction, LocationChangeAction } from 'connected-react-router'

declare module 'typesafe-actions' {
  export type ReactRouterAction = RouterAction | LocationChangeAction
  export type RootAction =
    | ActionType<typeof import('./rootActions').default>
    | ReactRouterAction
  export type RootState = StateType<typeof import('./rootReducers').default>
  export type Services = typeof import('../services').default

  interface Types {
    RootAction: RootAction
    RootState: RootState
    Services: Services
  }
}
