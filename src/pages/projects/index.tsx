import React, { useCallback, useState } from 'react'
import useSWR from 'swr'
import { Box, Heading, Text, Flex } from 'rebass'
import { compareDesc } from 'date-fns'
import { getProjects } from '@/api/projects'
import { Link } from '@/components/Link'
import { ProjectList } from '@/components/ProjectList'
import { AddProjectForm } from '@/components/forms/AddProject'

const Page = () => {
  const [addingProject, setAddingProject] = useState(false)
  const { data: response, mutate } = useSWR('projects', () => getProjects())
  const handleSubmitted = useCallback(() => {
    setAddingProject(false)
    mutate()
  }, [])
  const handleAdding = useCallback(() => setAddingProject(true), [])
  const handleCancel = useCallback(() => setAddingProject(false), [])

  if (!response) return <>loading...</>
  if (!response.ok) return <>error</>

  const projects = response.data

  return (
    <>
      <Box mb={3}>
        <Heading as='h1' fontSize={5}>Projects</Heading>
      </Box>

      <Flex flex={1} justifyContent="center" mt={2}>
        <Flex flexDirection="column" width={800}>

          <Box mb={2}>
            {projects
              .sort((a, b) => compareDesc(new Date(a.createdAt), new Date(b.createdAt)))
              .map((object) => (
                <ProjectList key={object._id} project={object} onDelete={handleSubmitted} />
              ))
            }
          </Box>

          {addingProject
            ? (<AddProjectForm onSubmitted={handleSubmitted} onCancel={handleCancel} />)
            : (
              <Flex alignItems="center" onClick={handleAdding} style={{ cursor: 'pointer' }}>
                <Box mr={2}>
                  <Text fontSize={3} color="primary">+</Text>
                </Box>
                <Text fontWeight="bold">Add project</Text>
              </Flex>
            )
          }
        </Flex>
      </Flex>
    </>
  )
}

export default Page
