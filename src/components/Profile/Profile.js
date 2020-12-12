import Avatar from './Avatar/Avatar'
import classes from './Profile.module.css'
import Status from './Status/Status'

const Profile = props => {
   return (
      <div className={classes.Profile}>
         <div className={classes.header}>
            <div className={classes.avatar}>
               <Avatar
                  img={
                     props.photos && props.photos.large
                        ? props.photos.large
                        : null
                  }
               />
            </div>
            <div className={classes.info}>
               <h1 className={classes.name}>{props.fullName}</h1>
               <ul className={classes.contacts}>
                  {Object.entries(props.contacts || []).map(contact => {
                     if (contact[1]) {
                        const link = contact[1].startsWith('http')
                           ? contact[1]
                           : `https://${contact[1]}`
                        return (
                           <li key={props.userId + contact[0]}>
                              <a
                                 href={link}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className={classes.contactsLink}>
                                 <div
                                    className={
                                       classes.contactsImg +
                                       ` ${classes[contact[0]]}`
                                    }></div>
                              </a>
                           </li>
                        )
                     } else {
                        return false
                     }
                  })}
               </ul>
               <Status
                  status={props.status}
						userId={props.userId}
						current={!props.userId || (props.userId === +props.currentUserId)}
                  currentUserId={props.currentUserId}
                  updateStatus={props.updateStatus}
               />
            </div>
         </div>
         <div className={classes.body}>
            <h2 className={classes.lookingForAJob}>
               {props.lookingForAJob ? 'Looking for a job' : 'Working, not looking for a job'}
            </h2>
            {props.lookingForAJob && props.lookingForAJobDescription && (
               <p className={classes.lookingForAJobDescription}>
                  {props.lookingForAJobDescription}
               </p>
            )}
         </div>
      </div>
   )
}

export default Profile
