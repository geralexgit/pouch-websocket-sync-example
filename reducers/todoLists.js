import { ADD_TODO_LIST, REMOVE_TODO_LIST} from '../constants/ActionTypes'

const initialState = [{_id: 1},{_id: 2}]

export default function todoLists(state = initialState, action) {
	
	switch (action.type) {
		case ADD_TODO_LIST:
			return [
				...state,
				{_id: id(),
				listName: action.listName}
			]
		case REMOVE_TODO_LIST:			
			return state.filter(item => item._id !== action.id)
	}

	return state;
}

const id = () => {
	return 'todolist_1_' + (new Date).getTime();
}