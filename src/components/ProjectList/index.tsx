import React, { useCallback, SyntheticEvent } from 'react'
import { parseISO, format } from 'date-fns'
import { deleteProject } from '@/api/projects'
import { Link } from '@/components/Link'
import {
  Box,
  Card,
  Text,
  Flex,
} from 'rebass'

type TProps = {
  project: {
    _id: string
    createdAt: string
    name: string
  }
}

export const ProjectList = ({ project }: TProps) => {
  const handleDelete = useCallback(async (event: SyntheticEvent) => {
    event.preventDefault()
    event.stopPropagation()

    if (typeof window !== 'undefined') {
      const ok = window.confirm('Are you sure to delete the project?')

      if (ok) {
        await deleteProject(project._id)
      }
    }

  }, [project])

  return (
    <Box mb={3}>
      <Link
        href="/projects/[_id]"
        as={`/projects/${project._id}`}
        unstyled
      >
        <Card>
          <Flex>
            <Flex flex={1} flexDirection="column">
              <Text fontSize={3} fontWeight="bold">{project.name}</Text>
              <Text color="muted">{format(parseISO(project.createdAt), 'dd MMMM p')}</Text>
            </Flex>

            <Flex flexDirection="column">
              <Text color="muted" fontSize={3} onClick={handleDelete}>X</Text>
            </Flex>
          </Flex>
        </Card>
      </Link>
    </Box>
  )
}
