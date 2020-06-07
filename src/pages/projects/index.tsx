import React, { useCallback } from 'react'
import useSWR from 'swr'
import { Box, Heading, Text, Flex } from 'rebass'
import { compareDesc } from 'date-fns'
import { getProjects } from '@/api/projects'
import { Link } from '@/components/Link'
import { ProjectList } from '@/components/ProjectList'

const Page = () => {
  const { data: response, mutate } = useSWR('projects', () => getProjects())
  const handleDelete = useCallback(() => mutate(), [])

  if (!response) return <>loading...</>
  if (!response.ok) return <>error</>

  const projects = response.data

  return (
    <>
      <Box mb={3}>
        <Heading as='h1' fontSize={6}>Projects</Heading>
      </Box>

      <Box mb={2}>
        {projects
          .sort((a, b) => compareDesc(new Date(a.createdAt), new Date(b.createdAt)))
          .map((object) => (
            <ProjectList key={object._id} project={object} onDelete={handleDelete} />
          ))
        }
      </Box>

      <Link href="/projects/new" nav>
        <Flex alignItems="center">
          <Box mr={2}>
            <Text fontSize={3} color="primary">+</Text>
          </Box>
          <Text>Add project</Text>
        </Flex>
      </Link>
    </>
  )
}

export default Page
