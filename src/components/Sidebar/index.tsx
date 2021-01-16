import React from 'react'
import useSWR from 'swr'
import { Text, Box, Flex } from 'rebass'
import { compareDesc } from 'date-fns'
import { getProjects } from '@/api/projects'
import { Link } from '@/components/Link'

export const Sidebar = () => {
  const { data: response } = useSWR('projects', () => getProjects())

  if (!response) return <>loading...</>
  if (!response.ok) return <>error</>

  const projects = response.data

  return (
    <Flex flex={1} flexDirection="column" justifyContent="space-between">
      <Flex flexDirection="column">
        <Box mb={4}>
          <Box mb={2}>
            <Link href="/inbox" unstyled>
              <Text
                fontSize={2}
                fontWeight='bold'
              >
                📥 Inbox
              </Text>
            </Link>
          </Box>

          <Box mb={2}>
            <Link href="/today" unstyled>
              <Text
                fontSize={2}
                fontWeight='bold'
              >
                📫 Today
              </Text>
            </Link>
          </Box>

          <Box mb={2}>
            <Link href="/upcoming" unstyled>
              <Text
                fontSize={2}
                fontWeight='bold'
              >
                🗓 Upcoming
              </Text>
            </Link>
          </Box>

          <Box mt={4} bg="gray" width={1} height={1} />
        </Box>

        <Box mb={4}>
          <Box mb={2}>
            <Link href="/projects" unstyled>
              <Text
                fontSize={2}
                fontWeight='bold'
              >
                🗂 Projects
              </Text>
            </Link>
          </Box>

          {projects
            .sort((a, b) => compareDesc(new Date(a.createdAt), new Date(b.createdAt)))
            .map((project: any) => (
              <Box key={project._id}>
                <Link
                  href="/projects/[_id]"
                  as={`/projects/${project._id}`}
                  nav
                >
                  <Text>{project.emoji.native} {project.name}</Text>
                </Link>
              </Box>
            ))
          }
        </Box>
      </Flex>

      <Flex flexDirection="column">
        <Box mb={3} bg="gray" width={1} height={1} />

        <Box mb={4}>
          <Box>
            <Link href="/notes" nav>
              All Notes
            </Link>
          </Box>

          <Box>
            <Link href="/todos" nav>
              All Todos
            </Link>
          </Box>

          <Box>
            <Link href="/templates" nav>
              All Templates
            </Link>
          </Box>
        </Box>

        <Box>
          <Link href="/events" nav>
            Events
          </Link>
        </Box>

        <Box>
          <Link href="/actions" nav>
            Actions
          </Link>
        </Box>

        <Box>
          <Link href="/workflows" nav>
            Workflows
          </Link>
        </Box>
      </Flex>
    </Flex>
  )
}
