import {
  POPULATE_USER,
  TOGGLE_COMPLETED_VISIBILITY,
  POPULATE_ALL_TASKS
} from './constants'

/**
 * Visibility actions
 */
export const populateUser = (user) => ({ type: POPULATE_USER, user })

/**
 * Visibility actions
 */
export const toggleCompletedVisibility = (visibility) => ({ type: TOGGLE_COMPLETED_VISIBILITY, visibility })

/**
 * Task actions
 * 
 * {
 *   "_id" : "hCWK254fTREhPpmPx",
 *   "text" : "h",
 *   "createdAt" : ISODate("2019-04-15T21:47:12.450Z"),
 *   "owner" : "q5h5PSqf7hawJkaNN",
 *   "username" : "kkk",
 *   "private" : true 
 * }
 */
export const populateTasks = (tasks) => ({ type: POPULATE_ALL_TASKS, tasks })
