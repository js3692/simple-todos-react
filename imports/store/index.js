import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { Tasks } from '../api/tasks.js';

import { populateUser, populateTasks } from './actions';
import rootReducer from './reducers';

function setupReactiveDispatcher(dispatch) {
  Tracker.autorun(() => {
    const user = Meteor.user() || {}
    dispatch(populateUser(user))
  })

  const handle = Meteor.subscribe('tasks');
  Tracker.autorun(() => {
    if (handle.ready()) {
      const tasks = Tasks.find({}, { sort: { createdAt: -1 } }).fetch()
      dispatch(populateTasks(tasks))
    }
  });
}

function createReactiveStore() {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );

  setupReactiveDispatcher(store.dispatch)

  return store
}

export default createReactiveStore()
