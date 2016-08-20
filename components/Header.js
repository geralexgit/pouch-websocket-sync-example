import React, { PropTypes, Component } from 'react'
import TodoTextInput from './TodoTextInput'

class Header extends Component {

  handleSave(text) {
    if (text.length !== 0) {
      this.props.addTodo(text)
    }
  }

  render() {
    return (
      <header className="header">
          <h1>todos</h1>
          <button className="button_add_todo_list" onClick={this.props.addTodoList}>Add list</button>
      </header>
    )
  }
}

Header.propTypes = {
  addTodoList: PropTypes.func.isRequired
}

export default Header
