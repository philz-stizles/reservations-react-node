import { combineReducers } from 'redux'
import logReducer from './log-reducer'
import alertReducer from './alert-reducer'

export default combineReducers({
  log: logReducer,
  alert: alertReducer
})
