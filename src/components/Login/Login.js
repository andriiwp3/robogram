import { Redirect } from 'react-router-dom'
import classes from './Login.module.css'
import LoginForm from './LoginForm/LoginForm'

const Login = props => {
   return props.isAuth ? (
      <Redirect to="/profile" />
   ) : (
      <div className={classes.Login}>
         <h1 className={classes.title}>Login</h1>
         <LoginForm error={props.error} login={props.login} />
      </div>
   )
}

export default Login
