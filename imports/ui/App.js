import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';

import { connect } from 'react-redux';

import { toggleCompletedVisibility } from '../store/actions';

import Task from './Task.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.state = { newTask: '' };
  }

  handleSubmit(event) {
    event.preventDefault();

    const text = this.state.newTask

    Meteor.call('tasks.insert', text, (err, res) => {
      this.setState({ newTask: '' })
    });
  }

  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.props.completedTaskVisibility) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map((task) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = task.owner === currentUserId;

      return (
        <Task
          key={task._id}
          task={task}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List ({this.props.incompleteCount})</h1>

          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={this.props.completedTaskVisibility}
              onClick={() => { this.props.toggleHideCompleted(this.props.completedTaskVisibility) }}
            />
            Hide Completed Tasks
          </label>

          <AccountsUIWrapper />

          { this.props.currentUser ?
            <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
              <input
                type="text"
                value={this.state.newTask}
                onChange={({ target: { value } }) => { this.setState({ newTask: value }) }}
                placeholder="Type to add new tasks"
              />
            </form> : ''
          }
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ user, tasks, completedTaskVisibility }) => {
  const incompleteCount = tasks.reduce(t => t.checked ? 0 : 1, 0)

  return {
    completedTaskVisibility,
    tasks,
    incompleteCount,
    currentUser: user
  }
}

const mapDispatchToProps = (dispatch) => ({
  toggleHideCompleted: (current) => {
    dispatch(toggleCompletedVisibility(!current))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
