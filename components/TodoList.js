import React, { Component, PropTypes } from 'react'
import TodoItem from './TodoItem'
import TodoTextInput from './TodoTextInput'
import Footer from './Footer'


import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
}

class TodoList extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = { filter: SHOW_ALL }
  }

  handleSave(text) {
    if (text.length !== 0) {
      this.props.actions.addTodo(text, this.props.todoList._id)
    }
  }

  handleShow(filter) {
    this.setState({ filter })
  }

  handleClearCompleted() {
    const atLeastOneCompleted = this.props.todos.some(todo => todo.completed)
    if (atLeastOneCompleted) {
      this.props.actions.clearCompleted()
    }
  }

  renderToggleAll(completedCount) {
    const { todos, actions } = this.props
    if (todos.length > 0) {
      return (
        <input className="toggle-all"
               type="checkbox"
               checked={completedCount === todos.length}
               onChange={actions.completeAll} />
      )
    }
  }

  renderFooter(completedCount) {
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

 render() {
    const { todos, actions, todoList } = this.props
    const { filter } = this.state
    const filteredTodos = todos.filter(TODO_FILTERS[filter])
    const completedCount = todos.reduce((count, todo) =>
      todo.completed ? count + 1 : count,
      0
    )
    return (
    	<div>
	    	<TodoTextInput newTodo
	                         onSave={this.handleSave.bind(this)}
	                         placeholder="What needs to be done?" />

	        <ul className="todo-list">
	          {filteredTodos.map(todo =>
	            <TodoItem key={todo._id} todo={todo} {...actions} />
	          )}
            <button className="button_removeTodoList" onClick={() => actions.removeTodoList(todoList._id)}>Remove list</button>
	        </ul>
	        {this.renderFooter(completedCount)}
        </div>
    )
  }
}

TodoList.propTypes = {
  actions: PropTypes.object.isRequired
}

export default TodoList
