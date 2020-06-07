import React from 'react'
import { compareDesc } from 'date-fns'
import { Box, Heading, Text, Flex } from 'rebass'
import useSWR from 'swr'
import { getTodos } from '@/api/todos'
import { Link } from '@/components/Link'
import { TodoList } from '@/components/TodoList'

const Page = () => {
  const { data: response } = useSWR('todos', () => getTodos())

  if (!response) return <>loading...</>
  if (!response.ok) return <>error</>

  return (
    <>
      <Box mb={3}>
        <Heading as='h1' fontSize={6}>Todos</Heading>
      </Box>

      <Box mb={2}>
        {response.data
          .sort((a, b) => compareDesc(new Date(a.createdAt), new Date(b.createdAt)))
          .map((object) => (
            <TodoList key={object._id} todo={object} />
          ))
        }
      </Box>

      <Link href="/todos/new" nav>
        <Flex alignItems="center">
          <Box mr={2}>
            <Text fontSize={3} color="primary">+</Text>
          </Box>
          <Text>Add note</Text>
        </Flex>
      </Link>
    </>
  )
}

export default Page
