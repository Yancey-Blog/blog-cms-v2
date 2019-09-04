import { combineReducers } from 'redux'
import CounterReducers from 'stores/counter/reducers'

const rootReducer = combineReducers({
  CounterReducers,
})

export default rootReducer
