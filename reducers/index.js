import { combineReducers } from 'redux'
import todos from './todos'
import todoLists from './todoLists'
import syncState from './syncState'

export default combineReducers({
  todoLists, syncState, todos
})
