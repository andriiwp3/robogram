import { connect } from 'react-redux'
import { getUsers } from '../../redux/reducers/usersReducer'
import UsersContainer from './UsersContainer'
import {
   setCurrentPage,
   follow,
   unfollow,
} from './../../redux/reducers/usersReducer'
import { compose } from 'redux'
import { withAuthRedirect } from './../../hoc/withAuthRedirect';

const mapStateToProps = state => ({
   users: state.usersPage.users,
   totalCount: state.usersPage.totalCount,
   currentPage: state.usersPage.currentPage,
   usersPerPage: state.usersPage.usersPerPage,
   isFetching: state.usersPage.isFetching,
   followingInProgress: state.usersPage.followingInProgress,
   error: state.usersPage.error,
})

export default compose(
	withAuthRedirect,
   connect(mapStateToProps, { getUsers, setCurrentPage, follow, unfollow }),
)(UsersContainer)
