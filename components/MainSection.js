import React, { Component, PropTypes } from 'react'
// import TodoItem from './TodoItem'
import Footer from './Footer'
import TodoList from './TodoList'

import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'



class MainSection extends Component {
  
  render() {
    const { todoLists, actions, todos } = this.props

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
