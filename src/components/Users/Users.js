import classes from './Users.module.css'
import UserCard from './UserCard/UserCard'
import Loader from './../UI/Loader/Loader'

const Users = props => {
   return (
      <div className={classes.Users}>
         <div className={classes.header}>
            <h1 className={classes.title}>Все пользователи</h1>
         </div>
         {props.users.length < 1 && !props.isFetching && !props.error
            ? 'No users'
            : ''}
         {props.error && !props.isFetching
            ? 'There was an error, please try again later'
            : ''}
         <div className={classes.body}>
            {props.users.length > 0 && !props.error ? (
               <div className={classes.usersList}>
                  {props.users.map(user => {
                     return (
                        <UserCard
                           key={user.id}
                           id={user.id}
                           className={classes.userCard}
                           name={user.name}
                           img={user.photos.small}
									followed={user.followed}
									inProgress={props.followingInProgress.some(userId => userId === user.id)}
									follow={props.follow}
									unfollow={props.unfollow}
                        />
                     )
                  })}
               </div>
            ) : (
               ''
            )}
            {props.isFetching ? (
               <div className={classes.Loader}><Loader className={'dark'} /></div>
            ) : !props.error && props.users.length > 0 ? (
               <button
                  className={classes.button}
                  onClick={() => props.onLoadMoreUsers(props.currentPage + 1)}>
                  Load more users
               </button>
            ) : (
               ''
            )}
         </div>
      </div>
   )
}

export default Users
