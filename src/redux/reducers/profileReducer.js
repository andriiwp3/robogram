import { usersAPI } from './../../api/api'
const SET_PROFILE = 'PROFILE/SET_PROFILE'
const SET_STATUS = 'PROFILE/SET_STATUS'
const TOGGLE_IS_FETCHING = 'PROFILE/TOGGLE_IS_FETCHING'
const TOGGLE_ERROR = 'PROFILE/TOGGLE_ERROR'

let initialState = {
   isFetching: true,
   error: false,
   profile: {},
   status: null,
}

const usersReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_PROFILE:
         return {
            ...state,
            profile: action.data,
         }
      case SET_STATUS:
         return {
            ...state,
            status: action.status,
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

export const setProfile = data => ({
   type: SET_PROFILE,
   data,
})
export const setStatus = status => ({
   type: SET_STATUS,
   status,
})
export const toggleIsFetching = isFetching => ({
   type: TOGGLE_IS_FETCHING,
   isFetching,
})
export const toggleError = (error = false) => ({
   type: TOGGLE_ERROR,
   error,
})

export const getProfile = userId => async dispatch => {
   dispatch(toggleIsFetching(true))
   const data = await usersAPI.getProfile(userId)
   if (data) {
      usersAPI.getStatus(userId).then(status => {
         if (status) {
            dispatch(setStatus(status))
            dispatch(setProfile(data))
            dispatch(toggleError(false))
            dispatch(toggleIsFetching(false))
         } else {
            dispatch(setStatus(null))
            dispatch(setProfile(data))
            dispatch(toggleIsFetching(false))
         }
      })
   } else {
      dispatch(toggleError(true))
      dispatch(toggleIsFetching(false))
   }
}

export const getStatus = userId => async dispatch => {
   dispatch(toggleIsFetching(true))
   const status = await usersAPI.getStatus(userId)
   if (status) {
      dispatch(toggleError(false))
      dispatch(setStatus(status))
   }
   dispatch(toggleIsFetching(false))
}

export const updateStatus = status => async dispatch => {
   dispatch(toggleIsFetching(true))
   const data = await usersAPI.updateStatus(status)
   if (data && data.resultCode === 0) {
      dispatch(toggleError(false))
      dispatch(setStatus(status))
   } else {
      dispatch(
         setStatus('Не удалось обновить статус, попробуйте, пожалуйста, позже'),
      )
   }
   dispatch(toggleIsFetching(false))
}
export default usersReducer
