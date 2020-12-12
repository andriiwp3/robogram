import { Field, Form, Formik } from 'formik'
import classes from './LoginForm.module.css'

const LoginForm = props => {
   return (
      <Formik
         initialValues={{ email: '', password: '', rememberMe: false }}
         validate={values => {
            const errors = {}
            if (!values.email) {
               errors.email = 'Field is required'
            } else if (
               !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
               errors.email = 'Invalid email address'
            }
            if (!values.password) {
               errors.password = 'Field is required'
            }
            return errors
         }}
         onSubmit={values => {
            props.login(values.email, values.password, values.rememberMe)
         }}>
         {({ errors, handleSubmit, touched }) => (
            <Form onSubmit={handleSubmit} className={classes.form}>
               {props.error && (
                  <div className={classes.errorBlock}>{props.error.join(' ')}</div>
               )}
               <Field
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className={
                     classes.input +
                     (errors.email && touched.email ? ` ${classes.error}` : '')
                  }
                  required
                  autoFocus
               />
               {errors.email ? (
                  <div className={classes.errorBlock}>{errors.email}</div>
               ) : (
                  ''
               )}
               <Field
                  type="password"
                  name="password"
                  placeholder="Your Password"
                  className={
                     classes.input +
                     (errors.password && touched.password
                        ? ` ${classes.error}`
                        : '')
                  }
                  required
               />
               {errors.password ? (
                  <div className={classes.errorBlock}>{errors.password}</div>
               ) : (
                  ''
               )}
               <div className={classes.rememberMe}>
                  <Field
                     type="checkbox"
                     name="rememberMe"
                     className={classes.checkbox}
                  />
                  <span>Remember me</span>
               </div>
               <button
                  type="submit"
                  disabled={errors.email || errors.password}
                  className={classes.button}>
                  Submit
               </button>
            </Form>
         )}
      </Formik>
   )
}

export default LoginForm
