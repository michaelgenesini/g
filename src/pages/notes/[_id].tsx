import React from 'react'
import { GetStaticProps } from 'next'
import { getNote, getNotes } from '@/api/notes'
import { Box, Text } from 'rebass'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { parseISO, format } from 'date-fns'
import useSWR from 'swr'

type TProps = {
  noteId: string | null
}

const Page = ({ noteId }: TProps) => {
  if (!noteId) return <>Note not found</>

  const { data: response } = useSWR(`note-${noteId}`, () => getNote(noteId))

  if (!response) return <>loading...</>
  if (!response.ok) return <>error</>

  const note = response.data

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

  if (!response.ok) {
    return {
      fallback: true,
    } as const
  }

  const paths = response.data.map(note => ({ params: { _id: note._id }}))

  return {
    paths,
    fallback: false
  } as const
}


export const getStaticProps:  GetStaticProps<TProps, { _id: string }> = async ({ params }) => ({
  props: {
    noteId: params ? params._id : null
  }
})

export default Page
