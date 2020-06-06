import React from 'react'
import { GetStaticProps } from 'next'
import { getNote, getNotes } from '@/api/notes'
import { Box, Text } from 'rebass'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { parseISO, format } from 'date-fns'
import { TTodo } from '@/types'
import { getTodo, getTodos } from '@/api/todos'

type TProps = {
  todo: TTodo | null
}

const Page = ({ todo }: TProps) => {
  if (!todo) {
    return <div>Todo not found</div>
  }

  return (
    <>
      <Box mb={2}>
        <Text fontSize={3} fontWeight="bold">{todo.name}</Text>
      </Box>

      <Box mb={2}>
        <Text color="muted">{format(parseISO(todo.createdAt), 'dd MMMM p')}</Text>
      </Box>

      <Box mb={3} height={1} width={1} bg='gray' />
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


export const getStaticProps:  GetStaticProps<TProps, { _id: string }> = async ({ params }) => {
  if (!params) {
    return {
      props: {
        todo: null,
      },
    }
  }

  const response = await getTodo(params._id)

  if (!response.ok) {
    return {
      props: {
        todo: null
      }
    }
  }

  return {
    props: {
      todo: response.data
    }
  }
}

export default Page
