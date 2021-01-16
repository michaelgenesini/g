import React, { useCallback } from 'react'
import { Box, Text } from 'rebass'
import { mutate } from 'swr'
import { Label, Checkbox, Radio } from '@rebass/forms'
import { AddTaskForm } from '@/components/forms/AddTask'
import { updateTask } from '@/api/tasks'
import { TTodoAggregate, TProjectAggregate } from '@/types'

type TProps = {
  project: TProjectAggregate
  todo: TTodoAggregate
}

export const TaskList = ({ project, todo }: TProps) => {
  const handleSubmitted = useCallback(() => mutate('todos'), [])

  const handleCheck = useCallback(async ({ _id, completed }) => {
    const response = await updateTask({ _id, completed })
    console.log({ response })
    mutate(`project-${project._id}`)
  }, [project])

  console.log({ todo })

  return (
    <>
      <Box mb={2}>
        {todo.tasks.map(task => (
          <Box key={task._id} my={2}>
            <Label style={{ cursor: 'pointer' }}>
              <Radio
                defaultChecked={task.completed}
                id={task._id}
                name={task._id}
                onClick={() => handleCheck({ _id: task._id, completed: !task.completed })}
              />
              <Text style={{ textDecoration: task.completed ? 'line-through' : 'none'}}>{task.content}</Text>
            </Label>
            <Text color="gray">status: {task.status}</Text>
            <Box my={2} height={1} width={1} bg='gray' />
          </Box>
        ))}
      </Box>

      <AddTaskForm todoId={todo._id} onSubmitted={handleSubmitted} />
    </>
  )
}
