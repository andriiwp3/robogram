import { requestAuthUserData } from './authReducer'

const SET_INTIALIZED = 'APP/INITIALIZE_APP'

let initialState = {
   initialized: false,
}

const appReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_INTIALIZED:
         return {
            ...state,
            initialized: true,
         }
      default:
         return {
            ...state,
         }
   }
}

export const initializedSucces = () => ({
   type: SET_INTIALIZED,
})

export const initialize = () => async (dispatch, getState) => {
   await dispatch(requestAuthUserData())

   dispatch(initializedSucces())
}

export default appReducer
