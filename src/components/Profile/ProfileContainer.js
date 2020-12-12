import { useEffect } from 'react'
import Loader from '../UI/Loader/Loader'
import Profile from './Profile'

const ProfileContainer = props => {
   useEffect(() => {
      const userId = props.match.params.userId
      if (userId) {
         props.getProfile(userId)
      } else {
         props.getProfile(props.currentUserId)
      }
      //eslint-disable-next-line
   }, [props.match.params.userId])
   return props.isFetching ? (
      <Loader className={'dark'} />
   ) : props.error ? (
      'There was an error, please try again later'
   ) : (
      <Profile
         {...props.profile}
         status={props.status}
         userId={props.match.params.userId}
         currentUserId={props.currentUserId}
         updateStatus={props.updateStatus}
      />
   )
}

export default ProfileContainer
