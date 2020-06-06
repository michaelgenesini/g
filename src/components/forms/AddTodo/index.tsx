import React, { useCallback } from 'react'
import { Formik } from 'formik'
import randomEmoji from 'random-emoji'
import { Box, Button, Text, Flex } from 'rebass'
import { Label, Input } from '@rebass/forms'
import { addTodo } from '@/api/todos'
import { capitalize } from '@/utils/capitalize'

type TProps = {
  projectId?: string
  onSubmitted: () => void
}

export const AddTodoForm = ({ projectId, onSubmitted }: TProps) => {
  const submitHandler = useCallback((values, { setErrors, setSubmitting, resetForm }) => {
    if (values.name.trim() === '') {
      setErrors({
        name: 'missing name'
      })

      return
    }

    const run = async () => {
      const emoji = randomEmoji.random({ count: 1 })[0]

      const response = await addTodo({
        name: `${emoji.character} ${capitalize(values.name)}`,
        project_id: projectId,
      })

      if (!response.ok) {
        setErrors({
          name: 'missing name'
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
          flexDirection="column"
          flex={1}
          onSubmit={handleSubmit as unknown as ((event: React.FormEvent<HTMLDivElement>) => void)}
        >
          <Flex mb={4} flex={1} flexDirection="column">
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              name='name'
              type='text'
              placeholder='Todo name'
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

          <Flex>
            <Button type="submit" disabled={isSubmitting}>Save</Button>
          </Flex>
        </Flex>
      )}
    </Formik>
  )
}
