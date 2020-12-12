import { Link } from 'react-router-dom'
import classes from './UserCard.module.css'
import profilePlug from '../../../assets/profile-plug.jpg'

const UserCard = props => {
   return (
      <div className={classes.UserCard + ' ' + (props.className || '')}>
         <div className={classes.body}>
            <Link to={`/profile/${props.id}`}>
               <h2 className={classes.username}>{props.name}</h2>
            </Link>
            {props.followed ? (
               <button
                  className={classes.button}
                  disabled={props.inProgress}
                  onClick={() => props.unfollow(props.id)}>
                  Unfollow
               </button>
            ) : (
               <button
                  className={classes.button}
                  disabled={props.inProgress}
                  onClick={() => props.follow(props.id)}>
                  Follow
               </button>
            )}
         </div>
         <Link to={`/profile/${props.id}`} className={classes.img}>
            <img src={props.img || profilePlug} alt="user avatar" />
         </Link>
      </div>
   )
}

export default UserCard
