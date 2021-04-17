import { createStore, applyMiddleware } from 'redux'
import Reducer from '../reducer/reducer'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
const store = createStore(Reducer, applyMiddleware(thunk,logger))
export default store;