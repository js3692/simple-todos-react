import { combineReducers } from 'redux'

import {
  POPULATE_USER,
  TOGGLE_COMPLETED_VISIBILITY,
  POPULATE_ALL_TASKS
} from './constants'

const user = (state = {}, action) => {
  switch (action.type) {
    case POPULATE_USER:
      return action.user
    default:
      return state
  }
}

const tasks = (state = [], action) => {
  switch (action.type) {
    case POPULATE_ALL_TASKS:
      return action.tasks
    default:
      return state
  }
}

const completedTaskVisibility = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_COMPLETED_VISIBILITY:
      return action.visibility
    default:
      return state
  }
}

export default combineReducers({
  user,
  tasks,
  completedTaskVisibility
})
