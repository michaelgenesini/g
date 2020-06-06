import React, { useCallback } from 'react'
import { Box, Text } from 'rebass'
import { Input } from '@rebass/forms'
import { capitalize } from '@/utils/capitalize'
import { useForm } from 'react-hook-form'
import { addTask } from '@/api/tasks'

type TProps = {
  todoId?: string
  onSubmitted: (values: any) => void
}

export const AddTaskForm = ({ todoId, onSubmitted }: TProps) => {
  const { handleSubmit, register, errors, reset } = useForm()
  const onSubmit = useCallback(async (values: any) => {
    const task = values.task
    reset()

    const response = await addTask({
      content: capitalize(task),
      todo_id: todoId,
    })

    console.log(response)

    if (!response.ok) {

      console.error({ response })

      return
    }

    onSubmitted({
      _id: response.data.insertedId,
      content: task,
    })
  }, [onSubmitted, todoId])

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      width={1}
    >
      <Input
        name="task"
        ref={register({ required: true })}
        placeholder="Add task"
        autoComplete="off"
      />
      <Text color="accent">
        {errors.task && "Task is required"}
      </Text>
    </Box>
  )
}
