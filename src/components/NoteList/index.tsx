import React, { useCallback, SyntheticEvent } from 'react'
import { parseISO, format, formatDistanceToNowStrict } from 'date-fns'
import { deleteNote } from '@/api/notes'
import { Link } from '@/components/Link'
import {
  Box,
  Card,
  Text,
  Flex,
} from 'rebass'

type TProps = {
  note: {
    _id: string
    createdAt: string
    name: string
  }
}

export const NoteList = ({ note }: TProps) => {
  const handleDelete = useCallback(async (event: SyntheticEvent) => {
    event.preventDefault()
    event.stopPropagation()

    if (typeof window !== 'undefined') {
      const ok = window.confirm('Are you sure to delete the note?')

      if (ok) {
        await deleteNote(note._id)
      }
    }

  }, [note])

  return (
    <Box mb={3}>
      <Link
        href="/notes/[_id]"
        as={`/notes/${note._id}`}
        unstyled
      >
        <Card>
          <Flex>
            <Flex flex={1} flexDirection="column">
              <Text fontSize={3} fontWeight="bold">{note.name}</Text>
              <Text color="muted">{formatDistanceToNowStrict(parseISO(note.createdAt), { addSuffix: true })}</Text>
            </Flex>

            <Flex flexDirection="column" justifyContent="flex-end">
              <Text color="muted" onClick={handleDelete}>🗑</Text>
            </Flex>
          </Flex>
        </Card>
      </Link>
    </Box>
  )
}
