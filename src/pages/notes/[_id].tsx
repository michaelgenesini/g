import React from 'react'
import { GetStaticProps } from 'next'
import { getNote, getNotes } from '@/api/notes'
import { Box, Text } from 'rebass'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { parseISO, format } from 'date-fns'

type TProps = {
  note?: {
    _id: string
    content: string
    createdAt: string
    name: string
  }
}

const Page = ({ note }: TProps) => {
  if (!note) {
    return <div>Note not found</div>
  }

  return (
    <>
      <Box mb={2}>
        <Text fontSize={3} fontWeight="bold">{note.name}</Text>
      </Box>

      <Box mb={2}>
        <Text color="muted">{format(parseISO(note.createdAt), 'dd MMMM p')}</Text>
      </Box>

      <Box mb={3} height={1} width={1} bg='gray' />

      <Box mb={2} p={3}>
        <MarkdownRenderer source={note.content} />
      </Box>
    </>
  )
}

export const getStaticPaths = async () => {
  const response = await getNotes()
  const paths = response.data.map(note => ({ params: { _id: note._id }}))

  return {
    paths,
    fallback: false
  }
}


export const getStaticProps:  GetStaticProps<TProps, { _id: string }> = async ({ params }) => {
  if (!params) return { props: { note: undefined }}

  const response = await getNote(params._id)

  return {
    props: {
      note: response.data
    }
  }
}

export default Page
