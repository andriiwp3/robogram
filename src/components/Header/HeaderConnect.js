import { compose } from 'redux'
import { connect } from 'react-redux'
import Header from './Header'
import { login, logout } from './../../redux/reducers/authReducer'
import { memo } from 'react'

const mapStateToProps = state => ({
   isAuth: state.auth.isAuth,
   userLogin: state.auth.login,
})

export default compose(
   memo,
   connect(mapStateToProps, { login, logout }),
)(Header)
