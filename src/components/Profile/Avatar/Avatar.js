import classes from './Avatar.module.css'
import profilePlug from '../../../assets/profile-plug.jpg'

const Avatar = props => {
   return (
      <div className={classes.Avatar}>
         <div className={classes.img}>
            <img src={props.img || profilePlug} alt="" />
         </div>
      </div>
   )
}

export default Avatar
