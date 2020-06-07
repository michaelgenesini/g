import React from 'react'
import useSWR from 'swr'
import { Box, Text, Card, Flex, Heading } from 'rebass'
import { GetStaticProps } from 'next'
import { parseISO, format } from 'date-fns'
import { Select } from '@rebass/forms'
import { getProject, getProjects } from '@/api/projects'
import { Link } from '@/components/Link'
import { TTemplate } from '@/types'

type TProps = {
  projectId: string | null
}

const Page = ({ projectId }: TProps) => {
  if (!projectId) return <>Project not found</>

  const { data: response } = useSWR(`project-${projectId}`, () => getProject(projectId))

  if (!response) return <>loading...</>
  if (!response.ok) return <>error</>

  const project = response.data

  return (
    <>
      <Box mb={3}>
        <Heading as='h1' fontSize={6}>{project.emoji.native} {project.name}</Heading>
      </Box>

      <Box mb={3}>
        <Heading>Notes:</Heading>
      </Box>

      <Box mb={2}>
        {project.notes.length === 0
          ? (<Box mb={2}><Text>No notes in this project</Text></Box>)
          : project.notes
            .map((note) => (
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
          }
      </Box>

      <Flex mb={4}>
        {project.templates.length > 0 && (
          <Box width={200} mr={2}>
            <Select
              id='template'
              name='template'
              defaultValue='no template'>
              {project.templates
                .concat({ _id: '0', name: 'no template', createdAt: '', content: '' })
                .map((template: TTemplate) => (
                  <option key={template._id}>
                    {template.name}
                  </option>
                ))
              }
            </Select>
          </Box>
        )}

        <Box mr={2}>
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

        <Box>
          <Link
            as={`/projects/${project._id}/template/new`}
            href="/projects/[_id]/template/new"
            nav
          >
            <Flex alignItems="center">
              <Box mr={2}>
                <Text fontSize={3} color="primary">+</Text>
              </Box>
              <Text>Add template</Text>
            </Flex>
          </Link>
        </Box>
      </Flex>

      <Box mb={3}>
        <Heading>Todos:</Heading>
      </Box>

      <Box>
        {project.todos.length === 0
          ? (<Box mb={2}><Text>No todos in this project</Text></Box>)
          : project.todos
            .map((note: any) => (
              <Box key={note._id} mb={3}>
                <Link
                  href="/todos/[_id]"
                  as={`/todos/${note._id}`}
                  unstyled
                >
                  <Card>
                    <Text fontSize={3} fontWeight="bold">{note.name}</Text>
                    <Text color="muted">{format(parseISO(note.createdAt), 'dd MMMM p')}</Text>
                  </Card>
                </Link>
              </Box>
            ))
          }
      </Box>

      <Box mb={4}>
        <Link
          as={`/projects/${project._id}/todo/new`}
          href="/projects/[_id]/todo/new"
          nav
        >
          <Flex alignItems="center">
            <Box mr={2}>
              <Text fontSize={3} color="primary">+</Text>
            </Box>
            <Text>Add todo</Text>
          </Flex>
        </Link>
      </Box>
    </>
  )
}

export const getStaticPaths = async () => {
  const response = await getProjects()

  if (!response.ok) {
    return {
      fallback: true,
    } as const
  }

  const paths = response.data.map(project => ({ params: { _id: project._id }}))

  return {
    paths,
    fallback: false
  } as const
}

export const getStaticProps: GetStaticProps<TProps, { _id: string }> = async ({ params }) => ({
  props: {
    projectId: params ? params._id : null
  }
})

export default Page
