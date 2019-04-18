import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import '../imports/startup/accounts-config.js';

import APP_STORE from '../imports/store';

import App from '../imports/ui/App.js';

Meteor.startup(() => {
  render(
    <Provider store={APP_STORE}>
      <App />
    </Provider>,
    document.getElementById('render-target')
  );
});
