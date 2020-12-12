import { authAPI } from './../../api/api'
const SET_USER_DATA = 'AUTH/AUTH_ME'
const TOGGLE_IS_FETCHING = 'AUTH/TOGGLE_IS_FETCHING'
const TOGGLE_ERROR = 'AUTH/TOGGLE_ERROR'

let initialState = {
   id: null,
   email: null,
   login: null,
   isAuth: false,
   isFetching: true,
   error: false,
}

const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_USER_DATA:
         return {
            ...state,
            ...action.payload,
         }
      case TOGGLE_IS_FETCHING:
         return {
            ...state,
            isFetching: action.isFetching,
         }
      case TOGGLE_ERROR:
         return {
            ...state,
            error: action.error,
         }
      default:
         return {
            ...state,
         }
   }
}

export const setUserData = (id, email, login, isAuth) => ({
   type: SET_USER_DATA,
   payload: { id, email, login, isAuth },
})
export const toggleIsFetching = isFetching => ({
   type: TOGGLE_IS_FETCHING,
   isFetching,
})
export const toggleError = (error = false) => ({
   type: TOGGLE_ERROR,
   error,
})

export const requestAuthUserData = () => async dispatch => {
   dispatch(toggleIsFetching(true))
   const data = await authAPI.authMe()
   if (data) {
      if (data.resultCode === 0) {
         let { id, email, login } = data.data
         dispatch(setUserData(id, email, login, true))
      } else {
			dispatch(setUserData(null, null, null, false))
		}
		dispatch(toggleError())
   } else {
      dispatch(toggleError(['There was an error, please try again later']))
   }
	dispatch(toggleIsFetching(false))
	
	return data
}

export const login = (email, password, rememberMe) => async dispatch => {
	const data = await authAPI.login(email, password, rememberMe)
   if (data) {
      if (data.resultCode === 0) {
         dispatch(requestAuthUserData())
      } else if (data.resultCode !== 0) {
         dispatch(toggleError(data.messages))
      }
   } else {
      dispatch(toggleError(['There was an error, please try again later']))
   }
}

export const logout = () => async dispatch => {
   const data = await authAPI.logout()
   if (data) {
      if (data.resultCode === 0) {
         dispatch(setUserData(null, null, null, false))
      } else if (data.resultCode !== 0) {
         dispatch(toggleError(data.messages))
      }
   } else {
      dispatch(toggleError(['There was an error, please try again later']))
   }
}

export default authReducer
