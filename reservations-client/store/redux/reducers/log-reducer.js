import { LOGS_START } from '../action-types'

const initialState = {
  logs: [],
  current: null,
  loading: false
}

const logReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case LOGS_START: {
      return { logs: payload }
    }
    default:
      return state
  }
}

export default logReducer
