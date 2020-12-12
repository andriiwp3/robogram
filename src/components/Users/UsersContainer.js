import { useEffect } from 'react'
import Users from './Users'

const UsersContainer = props => {
   useEffect(() => {
      if (
         props.users &&
         (props.users.length === 0 ||
            props.users.length < props.usersPerPage * props.currentPage)
      ) {
         props.getUsers(props.usersPerPage, props.currentPage)
		}
      // eslint-disable-next-line
   }, [props.currentPage, props.users])
   return (
      <Users
         users={props.users}
         isFetching={props.isFetching}
         currentPage={props.currentPage}
         error={props.error}
         followingInProgress={props.followingInProgress}
         follow={props.follow}
         unfollow={props.unfollow}
         onLoadMoreUsers={props.setCurrentPage}
      />
   )
}

export default UsersContainer
