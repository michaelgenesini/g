import React, { useCallback } from 'react'
import { Formik } from 'formik'
import { Button, Text, Flex } from 'rebass'
import { Label, Input, Textarea } from '@rebass/forms'
import removeMd from 'remove-markdown'
import { capitalize } from '@/utils/capitalize'
import { addTemplate } from '@/api/templates'

type TProps = {
  projectId?: string
  onSubmitted: () => void
}

export const AddTemplateForm = ({ projectId, onSubmitted }: TProps) => {
  const submitHandler = useCallback((values, { setErrors, setSubmitting, resetForm }) => {
    const run = async () => {
      if (!values.name) {
        setErrors({
          content: 'missing content',
        })

        return
      }

      const response = await addTemplate({
        content: values.content,
        name: capitalize(values.name),
        project_id: projectId,
      })

      if (!response.ok) {
        setErrors({
          content: 'API error',
        })

        return
      }

      setSubmitting(false)

      resetForm()

      onSubmitted()
    }

    run().catch(console.error)
  }, [projectId])

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
        <Flex
          as='form'
          flex={1}
          flexDirection="column"
          onSubmit={handleSubmit as unknown as ((event: React.FormEvent<HTMLDivElement>) => void)}
        >
          <Flex mb={3} flexDirection="column">
            <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                name='name'
                type='text'
                placeholder='Template name'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                autoFocus
                autoComplete="off"
              />
              <Text color="accent">
                {errors.name && touched.name && errors.name}
              </Text>
          </Flex>

          <Flex mb={4} flex={1} flexDirection="column">
            <Flex flex={1}>
              <Textarea
                id='content'
                name='content'
                type='text'
                placeholder='write your markdown here...'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.content}
                col={20}
                autoComplete="off"
              />
            </Flex>
            <Text color="accent">
              {errors.content && touched.content && errors.content}
            </Text>
          </Flex>

          <Flex>
            <Button type="submit" disabled={isSubmitting}>Save</Button>
          </Flex>
        </Flex>
      )}
    </Formik>
  )
}
