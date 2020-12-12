import { Route, Switch } from 'react-router-dom'
import classes from './App.module.css'
import HeaderConnect from './components/Header/HeaderConnect'
import LoginConnect from './components/Login/LoginConnect'
import ProfileConnect from './components/Profile/ProfileConnect'
import UsersConnect from './components/Users/UsersConnect'

const App = () => {
   return (
      <div className={classes.wrapper}>
         <HeaderConnect />

         <div className={classes.container + ' container'}>
            <Switch>
               <Route exact path="/">
                  <UsersConnect />
               </Route>
               <Route path="/profile/:userId?">
                  <ProfileConnect />
               </Route>
               <Route path="/login">
                  <LoginConnect />
               </Route>
               <Route path="*">404</Route>
            </Switch>
         </div>
      </div>
   )
}

export default App
