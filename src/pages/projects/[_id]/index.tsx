import React from 'react'
import { GetStaticProps } from 'next'
import { getProject, getProjects } from '@/api/projects'
import { Box, Text, Card, Flex, Heading } from 'rebass'
import { Link } from '@/components/Link'
import { parseISO, format } from 'date-fns'

type TProps = {
  project?: {
    _id: string
    createdAt: string
    name: string
    notes: string[]
  }
}

const Page = ({ project }: TProps) => {
  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <>
      <Box mb={3}>
        <Heading as='h1' fontSize={6}> {project.name}</Heading>
      </Box>

      <Box mb={3}>
        <Heading>Notes:</Heading>
      </Box>

      <Box>
        {project.notes.length > 0
          ? project.notes
            .map((note: any) => (
              <Box key={note._id} mb={3}>
                <Link
                  href="/notes/[_id]"
                  as={`/notes/${note._id}`}
                  unstyled
                >
                  <Card>
                    <Text fontSize={3} fontWeight="bold">{note.name}</Text>
                    <Text color="muted">{format(parseISO(note.createdAt), 'dd MMMM p')}</Text>
                  </Card>
                </Link>
              </Box>
            ))
          : (
            <Box mb={2}>
              <Text>No notes in this project</Text>
            </Box>
          )}
      </Box>

      <Box mb={4}>
        <Link
          as={`/projects/${project._id}/note/new`}
          href="/projects/[_id]/note/new"
          nav
        >
          <Flex alignItems="center">
            <Box mr={2}>
              <Text fontSize={3} color="primary">+</Text>
            </Box>
            <Text>Add note</Text>
          </Flex>
        </Link>
      </Box>

      <Box mb={3}>
        <Heading>Templates:</Heading>
      </Box>

      <Box mb={3}>
        <Text>Coming soon</Text>
      </Box>
    </>
  )
}

export const getStaticPaths = async () => {
  const response = await getProjects()
  const paths = response.data.map(note => ({ params: { _id: note._id }}))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<TProps, { _id: string }> = async ({ params }) => {
  if (!params) return { props: { project: undefined }}

  const response = await getProject(params._id)

  return {
    props: {
      project: response.data
    }
  }
}

export default Page
