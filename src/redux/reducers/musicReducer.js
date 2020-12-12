import { musicAPI } from '../../api/api'

const SET_RECOMMENDATIONS_LIST = 'MUSIC/SET_RECOMMENDATIONS_LIST'
const TOGGLE_IS_FETCHING = 'MUSIC/TOGGLE_IS_FETCHING'

const initialState = {
   recommendationsList: null,
   isFetching: true,
}

const musicReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_RECOMMENDATIONS_LIST:
         return {
            ...state,
            recommendationsList: action.list,
         }
      case TOGGLE_IS_FETCHING:
         return {
            ...state,
            isFetching: action.isFetching,
         }
      default:
         return {
            ...state,
         }
   }
}

export const setRecommendationsList = list => ({
   type: SET_RECOMMENDATIONS_LIST,
   list,
})

export const toggleIsFetching = isFetching => ({
   type: TOGGLE_IS_FETCHING,
   isFetching,
})

export const getRecommendationsList = () => async dispatch => {
   dispatch(toggleIsFetching(true))
   const data = await musicAPI.getRecommendationsList()
   if (data) {
      dispatch(setRecommendationsList(data))
   } else {
		dispatch(setRecommendationsList(null))
   }
}

export default musicReducer
