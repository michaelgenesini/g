import React, { useCallback } from 'react'
import { parseISO, format } from 'date-fns'
import { Box, Text } from 'rebass'
import { mutate } from 'swr'
import { Label, Checkbox } from '@rebass/forms'
import { AddTaskForm } from '@/components/forms/AddTask'
import { updateTask } from '@/api/tasks'
import { TTodoAggregate } from '@/types'

type TProps = {
  todo: TTodoAggregate
}

export const Todo = ({ todo }: TProps) => {
  const handleSubmitted = useCallback(() => mutate('todos'), [])

  const handleCheck = useCallback(async ({ _id, completed }) => {
    await updateTask({ _id, completed })
    mutate('todos')
  }, [])

  return (
    <>
      <Box mb={2}>
        <Text fontSize={3} fontWeight="bold">{todo.name}</Text>
      </Box>

      <Box mb={2}>
        <Text color="gray">{format(parseISO(todo.createdAt), 'dd MMMM p')}</Text>
      </Box>

      <Box mb={2} height={1} width={1} bg='gray' />

      <Box mb={2}>
        {todo.tasks.map(task => (
          <Box key={task._id} my={2}>
            <Label style={{ cursor: 'pointer' }}>
              <Checkbox
                defaultChecked={task.completed}
                id={task._id}
                name={task._id}
                onClick={() => handleCheck({ _id: task._id, completed: !task.completed })}
              />
              <Text style={{ textDecoration: task.completed ? 'line-through' : 'none'}}>{task.content}</Text>
            </Label>
            <Box my={2} height={1} width={1} bg='gray' />
          </Box>
        ))}
      </Box>

      <AddTaskForm todoId={todo._id} onSubmitted={handleSubmitted} />
    </>
  )
}
