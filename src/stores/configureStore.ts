import { applyMiddleware, createStore } from 'redux'
import { routerMiddleware as createRouterMiddleware } from 'connected-react-router'
import loggerMiddleware from 'redux-logger'
import { createEpicMiddleware } from 'redux-observable'
import { RootAction, RootState, Services } from 'typesafe-actions'
import { composeWithDevTools } from 'redux-devtools-extension'
import history from 'shared/history'
import services from 'services'
import rootReducers from './rootReducers'
import rootEpics from './rootEpics'

const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState,
  Services
>({
  dependencies: services,
})
const routerMiddleware = createRouterMiddleware(history)

export default function configureStore(initialState?: {}) {
  // 收集中间件
  const middlewares = [epicMiddleware, routerMiddleware, loggerMiddleware]

  // 应用中间件
  const middlewareEnhancer = applyMiddleware(...middlewares)

  // 收集增强，增强可以包含中间件和一些手写的增强
  const enhancers = [middlewareEnhancer]

  // 组合增强
  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(rootReducers, initialState, composedEnhancers)

  epicMiddleware.run(rootEpics)

  if (process.env.NODE_ENV !== 'production' && (module as any).hot) {
    // eslint-disable-next-line
    ;(module as any).hot.accept('./rootReducers', () =>
      store.replaceReducer(rootReducers),
    )
  }

  return store
}
