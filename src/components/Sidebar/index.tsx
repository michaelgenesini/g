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
    <>
      <Box mb={4}>
        <Box mb={2}>
          <Link href="/" unstyled>
            <Text
              fontSize={2}
              fontWeight='bold'
            >
              📥 Inbox
            </Text>
          </Link>
        </Box>

        <Box mb={2}>
          <Link href="/" unstyled>
            <Text
              fontSize={2}
              fontWeight='bold'
            >
              📫 Today
            </Text>
          </Link>
        </Box>

        <Box mb={2}>
          <Link href="/" unstyled>
            <Text
              fontSize={2}
              fontWeight='bold'
            >
              🗓 Upcoming
            </Text>
          </Link>
        </Box>
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

        <Link href="/projects/new" nav>
          <Flex alignItems="center">
            <Box mr={2}>
              <Text fontSize={3} color="primary">+</Text>
            </Box>
            <Text>Add project</Text>
          </Flex>
        </Link>
      </Box>
    </>
  )
}
