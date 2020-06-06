import React, { useCallback } from 'react'
import { Formik } from 'formik'
import { Box, Button, Text, Flex } from 'rebass'
import { Label, Input, Textarea } from '@rebass/forms'
import removeMd from 'remove-markdown'
import { addNote } from '@/api/notes'
import { capitalize } from '@/utils/capitalize'
import useSWR from 'swr'
import { fetcher } from '@/utils/api'
import { replaceTemplate } from '@/utils/templates'

type TProps = {
  projectId?: string
  template?: string
  onSubmitted: () => void
}

export const AddNoteForm = ({ projectId, onSubmitted, template }: TProps) => {
  const submitHandler = useCallback((values, { setErrors, setSubmitting, resetForm }) => {
    const run = async () => {
      const name = removeMd(values.content.substring(0, 50))

      if (!name) {
        setErrors({
          content: 'missing content',
        })

        return
      }

      const response = await addNote({
        content: values.content,
        name: capitalize(name),
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

  const content = replaceTemplate(template)

  return (
    <Formik
      initialValues={{ name: '', content }}
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
                autoFocus
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
