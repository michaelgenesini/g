import React from 'react'
import { compareDesc, parseISO, format } from 'date-fns'
import { getNotes } from '@/api/notes'
import { Link } from '@/components/Link'
import {
  Box,
  Card,
  Heading,
  Text,
  Flex,
  Button
} from 'rebass'

type TProps = {
  notes: {
    _id: string
    createdAt: string
    name: string
  }[]
}

const Page = (props: TProps) => (
  <>
    <Box mb={3}>
      <Heading as='h1' fontSize={6}>Notes</Heading>
    </Box>

    <Box mb={3}>
      <Heading>All your notes:</Heading>
    </Box>

    <Box>
      {props.notes
        .sort((a, b) => compareDesc(new Date(a.createdAt), new Date(b.createdAt)))
        .map((object) => (
          <Box key={object._id} mb={3}>
            <Link
              href="/notes/[_id]"
              as={`/notes/${object._id}`}
              unstyled
            >
              <Card>
                <Text fontSize={3} fontWeight="bold">{object.name}</Text>
                <Text color="muted">{format(parseISO(object.createdAt), 'dd MMMM p')}</Text>
              </Card>
            </Link>
          </Box>
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

export const getStaticProps = async () => {
  const data = await getNotes()

  return {
    props: {
      notes: data.data
    }
  }
}

export default Page
