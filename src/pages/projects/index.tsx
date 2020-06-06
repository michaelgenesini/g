import React from 'react'
import { compareDesc } from 'date-fns'
import { Box, Heading, Text, Flex } from 'rebass'
import { getProjects } from '@/api/projects'
import { Link } from '@/components/Link'
import { ProjectList } from '@/components/ProjectList'
import { TProject } from '@/types'

type TProps = {
  projects: TProject[]
}

const Page = ({ projects }: TProps) => {
  return (
    <>
      <Box mb={3}>
        <Heading as='h1' fontSize={6}>Projects</Heading>
      </Box>

      <Box mb={3}>
        <Heading>All your projects:</Heading>
      </Box>

      <Box>
        {projects
          .sort((a, b) => compareDesc(new Date(a.createdAt), new Date(b.createdAt)))
          .map((object) => (
            <ProjectList key={object._id} project={object} />
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

export const getStaticProps = async () => {
  const response = await getProjects()

  if (!response.ok) {
    return {
      props: {
        projects: [],
      },
    }
  }

  return {
    props: {
      projects: response.data,
    }
  }
}

export default Page
