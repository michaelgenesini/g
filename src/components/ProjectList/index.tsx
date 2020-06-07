import React, { useCallback, SyntheticEvent, useMemo } from 'react'
import { deleteProject } from '@/api/projects'
import { Link } from '@/components/Link'
import { Box, Text, Flex } from 'rebass'
import { TProject } from '@/types'
import { getEmojiFromColons } from '@/utils/emoji'

type TProps = {
  project: TProject
  onDelete: () => void
}

export const ProjectList = ({ project, onDelete }: TProps) => {
  const handleDelete = useCallback(async (event: SyntheticEvent) => {
    event.preventDefault()
    event.stopPropagation()

    if (typeof window !== 'undefined') {
      const ok = window.confirm('Are you sure to delete the project?')

      if (ok) {
        await deleteProject(project._id)

        onDelete()
      }
    }

  }, [project])

  return (
    <>
      <Box py={3}>
        <Link
          href="/projects/[_id]"
          as={`/projects/${project._id}`}
          unstyled
        >
          <Flex>
            <Flex flex={1} alignItems="center">
              <Flex mr={2} alignItems="center">
                <Text fontSize={3} fontWeight="bold">{project.emoji.native}</Text>
              </Flex>
              <Text fontSize={3} fontWeight="bold">{project.name}</Text>
            </Flex>

            <Flex flexDirection="column" justifyContent="flex-end">
              <Text color="muted" onClick={handleDelete}>🗑</Text>
            </Flex>
          </Flex>
        </Link>
      </Box>

      <Box width={1} height={1} bg="muted" />
    </>
  )
}
