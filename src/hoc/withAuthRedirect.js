import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

let mapStateToProps = state => ({
   isAuth: state.auth.isAuth,
})

export const withAuthRedirect = WrappedComponent => {
   const RedirectComponent = props => {
      let { isAuth, ...restProps } = props

      if (!isAuth) return <Redirect to="/login" />

      return <WrappedComponent {...restProps} />
   }

   let ConnectedAuthRedirectComponent = connect(
      mapStateToProps,
      {},
   )(RedirectComponent)

   return ConnectedAuthRedirectComponent
}
