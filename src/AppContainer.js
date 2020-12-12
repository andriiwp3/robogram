import { useEffect } from 'react'
import { memo } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { initialize } from './redux/reducers/appReducer'
import App from './App'
import Loader from './components/UI/Loader/Loader'

const AppContainer = ({ initialized, initialize }) => {
   useEffect(() => {
      initialize()
      // eslint-disable-next-line
   }, [initialized])

   if (!initialized)
      return (
         <div className={'mainLoader'}>
            <Loader />
         </div>
      )

   return <App />
}
const mapStateToProps = state => ({
   initialized: state.app.initialized,
})
export default compose(
   memo,
   connect(mapStateToProps, {
      initialize,
   }),
   withRouter,
)(AppContainer)
