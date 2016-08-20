import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MainSection from '../components/MainSection'
import SyncStatus from '../components/SyncStatus'
import * as TodoActions from '../actions/todos'

import Header from '../components/Header'

class App extends Component {
  render() {
    const { actions, syncState, todos, todoLists } = this.props
    // const todoLists = [{_id: 1},{_id: 2}]
    return (
      <div>

      <Header addTodoList={actions.addTodoList} />
        <MainSection todoLists={todoLists} todos={todos} actions={actions} />
        <SyncStatus status={syncState} />
      </div>
    )
  }
}

App.propTypes = {
  todoLists: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    todos: state.todos,
    todoLists: state.todoLists,
    syncState: state.syncState,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
