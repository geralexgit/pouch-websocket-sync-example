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
          <h1 className="list_name">Offline TODO Lists</h1>
          <input className="input" type="text" ref="input" placeholder="What is TODO list about?" />
          <button className="button button_add_todo_list"
                  onClick={ ()=> {
                                    if(this.refs.input.value!="") {
                                      this.props.addTodoList(this.refs.input.value)
                                      this.refs.input.value = "";
                                    }
                                  } }>
            Add list
          </button>
      </header>
    )
  }
  
}

Header.propTypes = {
  addTodoList: PropTypes.func.isRequired
}

export default Header
