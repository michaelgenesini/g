import React from 'react'
import { Box, Heading, Text, Flex } from 'rebass'
import { compareDesc } from 'date-fns'
import { getNotes } from '@/api/notes'
import { Link } from '@/components/Link'
import { NoteList } from '@/components/NoteList'
import { TNote } from '@/types'
import useSWR from 'swr'

const Page = () => {
  const { data: response } = useSWR('notes', () => getNotes())

  if (!response) return <>loading...</>
  if (!response.ok) return <>error</>

  return (
    <>
      <Box mb={3}>
        <Heading as='h1' fontSize={5}>Notes</Heading>
      </Box>

      <Flex flex={1} justifyContent="center" mt={2}>
        <Flex flexDirection="column" width={800}>
          <Box>
            {response.data
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
        </Flex>
      </Flex>
    </>
  )
}

export default Page
