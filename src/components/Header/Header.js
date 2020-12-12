import classes from './Header.module.css'
import logo from '../../assets/logo.svg'
import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'

const Header = ({ isAuth,userLogin, login, logout }) => {
   const [isMenuOpen, toggleMenu] = useState(false)
   return (
      <header className={classes.Header}>
         <div className={classes.headerContainer + ' container'}>
            <NavLink to="/" className={classes.logo}>
               <img src={logo} alt="logo" />
            </NavLink>
            {isAuth && (
               <div className={classes.menu}>
                  <div
                     className={
                        classes.menuBtn +
                        (isMenuOpen ? ` ${classes.active}` : '')
                     }
                     onClick={() => toggleMenu(!isMenuOpen)}>
                     <span></span>
                     <span></span>
                     <span></span>
                  </div>
                  <nav
                     className={
                        classes.menuBody +
                        (isMenuOpen ? ` ${classes.active}` : '')
                     }>
                     <ul className={classes.menuList}>
                        <li>
                           <NavLink
                              to="/"
                              exact
                              className={classes.menuLink}
                              activeClassName={classes.active}>
                              Users
                           </NavLink>
                        </li>
                        <li>
                           <NavLink
                              to="/direct"
                              className={classes.menuLink}
                              activeClassName={classes.active}>
                              Direct
                           </NavLink>
                        </li>
             {/*            <li>
                           <NavLink
                              to="/music"
                              className={classes.menuLink}
                              activeClassName={classes.active}>
                              Music
                           </NavLink>
                        </li> */}
                        <li>
                           <NavLink
                              exact
                              to="/profile"
                              className={classes.menuLink}
                              activeClassName={classes.active}>
                              Profile
                           </NavLink>
                        </li>
                     </ul>
                  </nav>
               </div>
            )}

            <div className={classes.info}>
					{isAuth ? <div className={classes.profile}>
						<span>{userLogin}</span>
						<button onClick={logout} className={classes.button}>Logout</button>
					</div> : <Link to="/login" onClick={login} className={classes.button}>Login</Link>}
				</div>
         </div>
      </header>
   )
}

export default Header
