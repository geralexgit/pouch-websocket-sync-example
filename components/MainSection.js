import React, { Component, PropTypes } from 'react'
// import TodoItem from './TodoItem'
import Footer from './Footer'
import TodoList from './TodoList'

import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'

/*const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
}*/

class MainSection extends Component {
  
  /*handleClearCompleted() {
    const atLeastOneCompleted = this.props.todos.some(todo => todo.completed)
    if (atLeastOneCompleted) {
      this.props.actions.clearCompleted()
    }
  }*/

  /*handleShow(filter) {
    this.setState({ filter })
  }*/

  /*renderToggleAll(completedCount) {
    const { todos, actions } = this.props
    if (todos.length > 0) {
      return (
        <input className="toggle-all"
               type="checkbox"
               checked={completedCount === todos.length}
               onChange={actions.completeAll} />
      )
    }
  }*/

  /*renderFooter(completedCount) {
    const { todos } = this.props
    const { filter } = this.state
    const activeCount = todos.length - completedCount

    if (todos.length) {
      return (
        <Footer completedCount={completedCount}
                activeCount={activeCount}
                filter={filter}
                onClearCompleted={this.handleClearCompleted.bind(this)}
                onShow={this.handleShow.bind(this)} />
      )
    }
  }
*/
  
  render() {

    //const { todoLists, actions } = this.props
    const { todoLists, actions, todos } = this.props

    /*const completedCount = todos.reduce((count, todo) =>
      todo.completed ? count + 1 : count,
      0
    )*/
    return (
      <section className="main">
        {todoLists.map(todoList =>
          <TodoList key={todoList._id} todos={todos} todoList={todoList} actions={actions} />
        )}
      </section>
    )

  }

}

MainSection.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  todoLists: PropTypes.array.isRequired
}

export default MainSection
