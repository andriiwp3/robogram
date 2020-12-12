import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
   getProfile,
   getStatus,
   updateStatus,
} from '../../redux/reducers/profileReducer'
import ProfileContainer from './ProfileContainer'
import { withAuthRedirect } from './../../hoc/withAuthRedirect'
import { compose } from 'redux'

const mapStateToProps = state => ({
   profile: state.profilePage.profile,
   status: state.profilePage.status,
   isFetching: state.profilePage.isFetching,
	error: state.profilePage.error,
	currentUserId: `${state.auth.id}`,
})

export default compose(
   withAuthRedirect,
   withRouter,
   connect(mapStateToProps, {
      getProfile,
      getStatus,
      updateStatus,
   }),
)(ProfileContainer)
