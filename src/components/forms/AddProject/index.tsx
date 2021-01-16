import React, { useCallback, useState } from 'react'
import { Formik } from 'formik'
import { Box, Button, Text, Flex } from 'rebass'
import { BaseEmoji } from 'emoji-mart'
import { Label, Input } from '@rebass/forms'
import { addProject } from '@/api/projects'
import { capitalize } from '@/utils/capitalize'
import { EmojiPicker } from '@/components/EmojiPicker'

type TProps = {
  onSubmitted: () => void
  onCancel: () => void
}

export const AddProjectForm = ({ onSubmitted, onCancel }: TProps) => {
  const [emoji, setEmoji] = useState<BaseEmoji | null>(null)

  const handleSetEmoji = useCallback((selectedEmoji: BaseEmoji) => {
    console.log({ selectedEmoji })

    setEmoji(selectedEmoji)
  }, [])

  const submitHandler = useCallback((values, { setErrors, setSubmitting, resetForm }) => {
    console.log(values)

    console.log({ emoji })

    if (values.name.trim() === '') {
      setErrors({
        name: 'missing name'
      })

      return
    }

    const run = async () => {
      const response = await addProject({
        emoji: emoji!,
        name: capitalize(values.name),
      })

      if (!response.ok) {
        setErrors({
          name: 'response not ok'
        })

        return
      }

      setSubmitting(false)

      resetForm()

      onSubmitted()
    }

    run().catch(console.error)
  }, [emoji])

  return (
    <Formik
      initialValues={{ name: '' }}
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
          <Flex mb={2} flexDirection="column">
            <Flex>
              <Flex mr={2} flexDirection="column">
                <Flex flex={1} alignItems="center">
                  <EmojiPicker onEmojiSelected={handleSetEmoji} />
                </Flex>
              </Flex>

              <Flex flex={1} flexDirection="column" mr={2}>
                <Input
                  id='name'
                  name='name'
                  type='text'
                  placeholder='Project name'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  autoFocus
                  autoComplete="off"
                />
              </Flex>
            </Flex>

            {errors.name && touched.name && (
              <Box mt={2}>
                <Text color="accent">
                  {errors.name}
                </Text>
              </Box>
            )}
          </Flex>

          <Flex alignItems="flex-end">
            <Box mr={2}>
              <Button type="submit" disabled={isSubmitting}>Save</Button>
            </Box>
            <Button onClick={onCancel} type="button" disabled={isSubmitting} variant="outline">Cancel</Button>
          </Flex>
        </Flex>
      )}
    </Formik>
  )
}
