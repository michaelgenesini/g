import React from 'react'
import { Formik } from 'formik'
import { addObject } from '@/api/objects'

type TProps = {
  onSubmitted: () => void
}

export const AddObject = ({ onSubmitted }: TProps) => (
  <div>
    <Formik
      initialValues={{ name: '' }}
      onSubmit={(values, { setSubmitting }) => {
        const run = async () => {
          await addObject({ name: values.name })

          setSubmitting(false)

          onSubmitted()
        }

        run().catch(console.error)
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />
          {errors.name && touched.name && errors.name}
          <button type="submit" disabled={isSubmitting}>
            Add object
          </button>
        </form>
      )}
    </Formik>
  </div>
)
