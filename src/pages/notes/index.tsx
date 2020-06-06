import React from 'react'
import { compareDesc } from 'date-fns'
import { getNotes } from '@/api/notes'
import { Link } from '@/components/Link'
import {
  Box,
  Heading,
  Text,
  Flex,
} from 'rebass'
import { NoteList } from '@/components/NoteList'

type TProps = {
  notes: {
    _id: string
    createdAt: string
    name: string
  }[]
}

const Page = ({ notes }: TProps) => {
  return (
    <>
      <Box mb={3}>
        <Heading as='h1' fontSize={6}>Notes</Heading>
      </Box>

      <Box mb={3}>
        <Heading>All your notes:</Heading>
      </Box>

      <Box>
        {notes
          .sort((a, b) => compareDesc(new Date(a.createdAt), new Date(b.createdAt)))
          .map((object) => (
            <NoteList key={object._id} note={object} />
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
  const response = await getNotes()

  if (!response.ok) {
    return {
      props: {
        notes: [],
      }
    }

  }

  return {
    props: {
      notes: response.data
    }
  }
}

export default Page
