import { ADD_TODO_LIST, REMOVE_TODO_LIST, INSERT_TODO_LIST, UPDATE_TODO_LIST} from '../constants/ActionTypes'

const initialState = []

export default function todoLists(state = initialState, action) {
	
	switch (action.type) {
		case ADD_TODO_LIST:
			return [
				...state,
				{_id: id(),
				listName: action.listName}
			]
		case INSERT_TODO_LIST:
			return [
				action.todoList,
				...state
			]
		case UPDATE_TODO_LIST:
			return state.map(todoList =>
				todoList._id === action.todoList._id ?
				action.todoList :
				todoList
			)
		case REMOVE_TODO_LIST:			
			return state.filter(item => item._id !== action.id)
	}

	return state;
}

function id() {
	return 'todolist_1_' + (new Date).getTime();
}