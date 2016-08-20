import * as types from '../constants/ActionTypes'
import PouchMiddleware from 'pouch-redux-middleware'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import PouchDB from 'pouchdb'
import PouchSync from 'pouch-websocket-sync'

const syncEvents = ['change', 'paused', 'active', 'denied', 'complete', 'error'];
const clientEvents = ['connect', 'disconnect', 'reconnect'];

const initialState = {
  syncState: {
    text: 'unknown'
  }
}

export default function configureStore() {
  const db = new PouchDB('todos');

  const syncClient = PouchSync.createClient()

  const sync = syncClient.
    connect('ws://b4bf5aea.ngrok.io:80').
    on('error', function(err) {
      console.log(err);
    }).
    sync(db, {
      remoteName: 'todos-server',
    })

  syncEvents.forEach(function(event) {
    sync.on(event, function() {
      store.dispatch({type: types.SET_SYNC_STATE, text: event});
    })
  })

  clientEvents.forEach(function(event) {
    syncClient.on(event, function() {
      store.dispatch({type: types.SET_SYNC_STATE, text: event});
    })
  })

  const isTodoList = (id) => {
    return id.toString().indexOf('todolist') !== -1
  }

  const isTodo = (id) => {
    return id.toString().indexOf('todolist') === -1
  }

  const pouchMiddleware = PouchMiddleware({
      path: '/todos',
      db,
      actions: {
        remove: doc => store.dispatch({type: types.DELETE_TODO, id: doc._id}),
        insert: doc => store.dispatch({type: types.INSERT_TODO, todo: doc}),
        update: doc => store.dispatch({type: types.UPDATE_TODO, todo: doc}),
      },
      changeFilter: (doc) => isTodo(doc._id)
    });

 const pouchMiddlewareList = PouchMiddleware(
    {
      path: '/todoLists',
      db,
      actions: {
        remove: doc => store.dispatch({type: types.REMOVE_TODO_LIST, id: doc._id}),
        insert: doc => store.dispatch({type: types.INSERT_TODO_LIST, todoList: doc}),
        update: doc => store.dispatch({type: types.UPDATE_TODO_LIST, todoList: doc})
      },
      changeFilter: (doc) => isTodoList(doc._id)
    }
  );

  const createStoreWithMiddleware = applyMiddleware(pouchMiddleware,pouchMiddlewareList)(createStore)
  const store = createStoreWithMiddleware(rootReducer, initialState)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
