import { connect } from 'react-redux'
import Login from './Login'
import { login } from './../../redux/reducers/authReducer'

const mapStateToProps = state => ({
	isAuth: state.auth.isAuth,
   error: state.auth.error,
})

export default connect(mapStateToProps, { login })(Login)
