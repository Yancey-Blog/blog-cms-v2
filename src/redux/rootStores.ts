import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './rootReducers'

export default function configureStore(initialState?: {}) {
  // 收集中间件
  const middlewares = [logger]

  // 应用中间件
  const middlewareEnhancer = applyMiddleware(...middlewares)

  // 收集增强，增强可以包含中间件和一些手写的增强
  const enhancers = [middlewareEnhancer]

  // 组合增强
  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(rootReducer, initialState, composedEnhancers)

  if (process.env.NODE_ENV !== 'production' && (module as any).hot) {
    ;(module as any).hot.accept('./rootReducer', () =>
      store.replaceReducer(rootReducer),
    )
  }

  return store
}
