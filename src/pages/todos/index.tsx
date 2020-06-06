import React from 'react'
import { compareDesc } from 'date-fns'
import { Box, Heading, Text, Flex } from 'rebass'
import { getTodos } from '@/api/todos'
import { Link } from '@/components/Link'
import { TodoList } from '@/components/TodoList'
import { TTodo } from '@/types'

type TProps = {
  todos: TTodo[]
}

const Page = ({ todos }: TProps) => {
  return (
    <>
      <Box mb={3}>
        <Heading as='h1' fontSize={6}>Todos</Heading>
      </Box>

      <Box mb={3}>
        <Heading>All your todos:</Heading>
      </Box>

      <Box>
        {todos
          .sort((a, b) => compareDesc(new Date(a.createdAt), new Date(b.createdAt)))
          .map((object) => (
            <TodoList key={object._id} todo={object} />
          ))
        }

        <Link href="/notes/new" nav>
          <Flex alignItems="center">
            <Box mr={2}>
              <Text fontSize={3} color="primary">+</Text>
            </Box>
            <Text>Add note</Text>
          </Flex>
        </Link>
      </Box>
    </>
  )
}

export const getStaticProps = async () => {
  const response = await getTodos()

  if (!response.ok) {
    return {
      props: {
        todos: [],
      }
    }

  }

  return {
    props: {
      todos: response.data
    }
  }
}

export default Page
