import React, { useCallback } from 'react'
import { Formik } from 'formik'
import { addObject } from '@/api/objects'
import { Box, Button } from 'rebass'
import { Label, Input, Textarea } from '@rebass/forms'

type TProps = {
  onSubmitted: () => void
}

export const AddObject = ({ onSubmitted }: TProps) => {
  const submitHandler = useCallback((values, { setSubmitting }) => {
    const run = async () => {
      await addObject({
        content: values.content,
        name: values.name,
      })

      setSubmitting(false)

      onSubmitted()
    }

    run().catch(console.error)
  }, [])

  return (
    <Formik
      initialValues={{ name: '', content: '' }}
      onSubmit={submitHandler}
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
        <Box
          as='form'
          onSubmit={handleSubmit}
        >
          <Box mb={4}>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              name='name'
              type='text'
              placeholder='Object name'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            {errors.name && touched.name && errors.name}
          </Box>


          <Box mb={4}>
            <Label htmlFor='content'>Content</Label>
            <Textarea
              id='content'
              name='content'
              type='text'
              placeholder='Object name'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.content}
              col={20}
            />
            {errors.content && touched.content && errors.content}
          </Box>

          <Button type="submit" disabled={isSubmitting}>
            Add object
          </Button>
        </Box>
      )}
    </Formik>
  )
}
