import React, { useCallback, SyntheticEvent } from 'react'
import { parseISO, format, formatDistanceToNowStrict } from 'date-fns'
import { deleteTodo } from '@/api/todos'
import { Link } from '@/components/Link'
import { Box, Card, Text, Flex } from 'rebass'
import { TTodo } from '@/types'
// import { Todo } from './Todo'

type TProps = {
  todo: TTodo
}

export const TodoList = ({ todo }: TProps) => {
  const handleDelete = useCallback(async (event: SyntheticEvent) => {
    event.preventDefault()
    event.stopPropagation()

    if (typeof window !== 'undefined') {
      const ok = window.confirm('Are you sure to delete the todo?')

      if (ok) {
        await deleteTodo(todo._id)
      }
    }

  }, [todo])

  return (
    <>
      <Box py={3}>
        <Link
          href="/todos/[_id]"
          as={`/todos/${todo._id}`}
          unstyled
        >
          <Flex>
            <Flex flex={1} flexDirection="column">
              <Text fontSize={3} fontWeight="bold">{todo.name}</Text>
              <Text color="gray">{formatDistanceToNowStrict(parseISO(todo.createdAt), { addSuffix: true })}</Text>
            </Flex>

            <Flex flexDirection="column" justifyContent="flex-end">
              <Text color="gray" onClick={handleDelete}>🗑</Text>
            </Flex>
          </Flex>
        </Link>
      </Box>

      <Box width={1} height={1} bg="gray" />
    </>
  )
}
