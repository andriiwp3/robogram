import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import usersReducer from './reducers/usersReducer'
import profileReducer from './reducers/profileReducer'
import authReducer from './reducers/authReducer'
import appReducer from './reducers/appReducer'
import musicReducer from './reducers/musicReducer'
import { compose } from 'redux'

const reducers = combineReducers({
   usersPage: usersReducer,
   profilePage: profileReducer,
   musicPage: musicReducer,
   auth: authReducer,
   app: appReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
   reducers,
   composeEnhancers(applyMiddleware(thunkMiddleware)),
)

export default store
