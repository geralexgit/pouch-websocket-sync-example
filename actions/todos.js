import * as types from '../constants/ActionTypes'

export function addTodo(text, todoListId) {
  return { type: types.ADD_TODO, text, todoListId }
}

export function deleteTodo(id) {
  return { type: types.DELETE_TODO, id }
}

export function editTodo(id, text) {
  return { type: types.EDIT_TODO, id, text }
}

export function completeTodo(id) {
  return { type: types.COMPLETE_TODO, id }
}

export function completeAll() {
  return { type: types.COMPLETE_ALL }
}

export function clearCompleted() {
  return { type: types.CLEAR_COMPLETED }
}

export function addTodoList() {
  return { type: types.ADD_TODO_LIST }
}

export function removeTodoList(id) {
  return { type: types.REMOVE_TODO_LIST, id }
}