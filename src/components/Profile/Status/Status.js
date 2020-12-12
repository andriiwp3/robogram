import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import classes from './Status.module.css'

let Status = props => {
   const [edited, setEdited] = useState(false)
   const toggleEdited = () => {
      setEdited(!edited)
   }

	return !props.status && !props.current ? (
      ''
   ) : (
      <div className={classes.Status} onDoubleClick={toggleEdited}>
         {((!props.status || edited) &&
            (props.current) && (
               <Formik
                  initialValues={{ status: props.status || '' }}
                  validate={values => {
                     const errors = {}
                     if ((values.status && values.status.length) > 300) {
                        errors.status = 'Max length 300 symbols'
                     }
                     return errors
                  }}
                  onSubmit={values => {
                     let status = values.status.trim() || null
                     toggleEdited()
                     props.updateStatus(status)
                  }}>
                  {({ values, errors, handleSubmit }) => (
                     <Form onSubmit={handleSubmit}>
                        <Field
                           type="text"
									name="status"
									value={values.status}
                           placeholder="Status"
                           className={
                              classes.input +
                              (errors.status ? ` ${classes.error}` : '')
                           }
                           autoFocus
                           autoComplete="off"
                        />
                        {errors.status ? (
                           <div className={classes.errorBlock}>
                              {errors.status}
                           </div>
                        ) : (
                           ''
                        )}
                        <button
                           type="submit"
                           disabled={errors.status}
                           className={classes.button}>
                           Submit
                        </button>
                     </Form>
                  )}
               </Formik>
            )) || <p>{props.status}</p>}
      </div>
   )
}
export default Status
