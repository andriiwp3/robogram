import { usersAPI } from './../../api/api'
import { updateObjectInArray } from './../../utils/objectHelpers'
const SET_USERS = 'USERS/SET_USERS'
const SET_TOTAL_COUNT = 'USERS/SET_TOTAL_COUNT'
const SET_CURRENT_PAGE = 'USERS/SET_CURRENT_PAGE'
const TOGGLE_IS_FETCHING = 'USERS/TOGGLE_IS_FETCHING'
const TOGGLE_ERROR = 'USERS/TOGGLE_ERROR'
const FOLLOW = 'USERS/FOLLOW'
const UNFOLLOW = 'USERS/UNFOLLOW'
const TOGGLE_FOLLOWING_PROGRESS = 'USERS/TOGGLE_FOLLOWING_PROGRESS'

let initialState = {
   users: [],
   followingInProgress: [],
   totalCount: null,
   currentPage: 1,
   usersPerPage: 9,
   isFetching: true,
   error: false,
}

const usersReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_USERS:
         return {
            ...state,
            users: [...state.users, ...action.users],
         }
      case SET_TOTAL_COUNT:
         return {
            ...state,
            totalCount: action.count,
         }
      case SET_CURRENT_PAGE:
         return {
            ...state,
            currentPage: action.page,
         }
      case FOLLOW: {
         return {
            ...state,
            users: updateObjectInArray(state.users, action.userId, 'id', {
               followed: true,
            }),
         }
      }
      case UNFOLLOW: {
         return {
            ...state,
            users: updateObjectInArray(state.users, action.userId, 'id', {
               followed: false,
            }),
         }
      }
      case TOGGLE_FOLLOWING_PROGRESS: {
         return {
            ...state,
            followingInProgress: action.isFetching
               ? [...state.followingInProgress, action.userId]
               : state.followingInProgress.filter(id => id !== action.userId),
         }
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

export const setUsers = users => ({
   type: SET_USERS,
   users: users,
})

export const setTotalCount = count => ({
   type: SET_TOTAL_COUNT,
   count,
})

export const setCurrentPage = page => ({
   type: SET_CURRENT_PAGE,
   page,
})

export const toggleIsFetching = isFetching => ({
   type: TOGGLE_IS_FETCHING,
   isFetching,
})

export const toggleError = (error = false) => ({
   type: TOGGLE_ERROR,
   error,
})

export const followSucces = userId => ({
   type: FOLLOW,
   userId,
})

export const unfollowSucces = userId => ({
   type: UNFOLLOW,
   userId,
})

export const toggleFollowingProgress = (isFetching, userId) => ({
   type: TOGGLE_FOLLOWING_PROGRESS,
   isFetching,
   userId,
})

export const getUsers = (count, page) => async dispatch => {
   dispatch(toggleIsFetching(true))
   const data = await usersAPI.getUsers(count, page)
   if (data.error === null) {
      dispatch(toggleError(false))
      dispatch(setUsers(data.items))
      dispatch(setTotalCount(data.totalCount))
      dispatch(toggleIsFetching(false))
   } else {
      dispatch(toggleError(true))
      dispatch(toggleIsFetching(false))
   }
}
export const follow = userId => async dispatch => {
   followUnfollowFlow(dispatch, userId, usersAPI.follow, followSucces)
}
export const unfollow = userId => async dispatch => {
   followUnfollowFlow(dispatch, userId, usersAPI.unfollow, unfollowSucces)
}

const followUnfollowFlow = async (
   dispatch,
   userId,
   apiMethod,
   actionCreator,
) => {
   dispatch(toggleFollowingProgress(true, userId))
   const data = await apiMethod(userId)
   if (data && data.resultCode === 0) {
      dispatch(actionCreator(userId))
   }
   dispatch(toggleFollowingProgress(false, userId))
}

export default usersReducer
