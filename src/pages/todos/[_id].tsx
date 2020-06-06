import React, { useCallback } from 'react'
import { parseISO, format } from 'date-fns'
import { Box, Text } from 'rebass'
import { GetStaticProps } from 'next'
import useSWR from 'swr'
import { Label, Checkbox } from '@rebass/forms'
import { getTodo, getTodos } from '@/api/todos'
import { AddTaskForm } from '@/components/forms/AddTask'
import { updateTask } from '@/api/tasks'

type TProps = {
  todoId: string | null
}

const Page = ({ todoId }: TProps) => {
  if (!todoId) return <>Todo not found</>

  const { data: response, mutate } = useSWR(`todo-${todoId}`, () => getTodo(todoId))

  const handleSubmitted = useCallback(() => mutate(), [])

  const handleCheck = useCallback(async ({ _id, completed }) => {
    await updateTask({ _id, completed })
    mutate()
  }, [])

  if (!response) return <>loading...</>
  if (!response.ok) return <>error</>

  const todo = response.data

  return (
    <>
      <Box mb={2}>
        <Text fontSize={3} fontWeight="bold">{todo.name}</Text>
      </Box>

      <Box mb={2}>
        <Text color="muted">{format(parseISO(todo.createdAt), 'dd MMMM p')}</Text>
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

export const getStaticPaths = async () => {
  const response = await getTodos()

  if (!response.ok) {
    return {
      fallback: true,
    } as const
  }

  const paths = response.data.map(todo => ({ params: { _id: todo._id }}))

  return {
    paths,
    fallback: false
  } as const
}


export const getStaticProps:  GetStaticProps<TProps, { _id: string }> = async ({ params }) => ({
  props: {
    todoId: params ? params._id : null
  }
})

export default Page
