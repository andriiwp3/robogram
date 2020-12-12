import classes from './Loader.module.css'

const Loader = ({className}) => {
   return (
      <div className={classes.banterLoader + ` ${classes[className]}`}>
         <div className={classes.banterLoaderBox}></div>
         <div className={classes.banterLoaderBox}></div>
         <div className={classes.banterLoaderBox}></div>
         <div className={classes.banterLoaderBox}></div>
         <div className={classes.banterLoaderBox}></div>
         <div className={classes.banterLoaderBox}></div>
         <div className={classes.banterLoaderBox}></div>
         <div className={classes.banterLoaderBox}></div>
         <div className={classes.banterLoaderBox}></div>
      </div>
   )
}

export default Loader
