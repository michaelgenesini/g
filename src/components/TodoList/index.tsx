import React, { useCallback, SyntheticEvent } from 'react'
import { parseISO, format } from 'date-fns'
import { deleteTodo } from '@/api/todos'
import { Link } from '@/components/Link'
import { Box, Card, Text, Flex } from 'rebass'
import { TTodo } from '@/types'

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
    <Box mb={3}>
      <Link
        href="/todos/[_id]"
        as={`/todos/${todo._id}`}
        unstyled
      >
        <Card>
          <Flex>
            <Flex flex={1} flexDirection="column">
              <Text fontSize={3} fontWeight="bold">{todo.name}</Text>
              <Text color="muted">{format(parseISO(todo.createdAt), 'dd MMMM p')}</Text>
            </Flex>

            <Flex flexDirection="column">
              <Text color="muted" fontSize={3} onClick={handleDelete}>X</Text>
            </Flex>
          </Flex>
        </Card>
      </Link>
    </Box>
  )
}
