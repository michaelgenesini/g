import React from 'react'
import { GetStaticProps } from 'next'
import { parseISO, format } from 'date-fns'
import { Box, Text, Card, Flex, Heading } from 'rebass'
import { getProject, getProjects } from '@/api/projects'
import { Link } from '@/components/Link'
import { TemplateList } from '@/components/TemplateList'
import { TProjectAggregate } from '@/types'

type TProps = {
  project: TProjectAggregate | null
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
        <Heading fontSize={2}>From templates:</Heading>
      </Box>

      <Flex mb={3}>
        {project.templates.length === 0
          ? (<Text>No templates saved for this project</Text>)
          : project.templates.map(template => (
            <Box key={template._id} mb={3}>
              <Link
                href="/projects/[_id]/template/[template_id]/note/new"
                as={`/projects/${project._id}/template/${template._id}/note/new`}
                unstyled
              >
                  <Text fontSize={2} fontWeight="bold">{template.name}</Text>
              </Link>
              </Box>
          ))
        }
      </Flex>

      <Box mb={4}>
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

      <Box mb={3}>
        <Heading>Todos:</Heading>
      </Box>

      <Box>
        {project.todos.length > 0
          ? project.todos
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
          : (
            <Box mb={2}>
              <Text>No todos in this project</Text>
            </Box>
          )}
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

export const getStaticProps: GetStaticProps<TProps, { _id: string }> = async ({ params }) => {
  if (!params) {
    return {
      props: {
        project: null,
      },
    }
  }

  const response = await getProject(params._id)

  if (!response.ok) {
    return {
      props: {
        project: null,
      },
    }
  }

  return {
    props: {
      project: response.data
    }
  }
}

export default Page
