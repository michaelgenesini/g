import React from 'react'
import { Text, Box, Flex } from 'rebass'
import useSWR from 'swr'
import { Link } from '@/components/Link'
import { fetcher } from '@/utils/api'

export const Sidebar = () => {
  const { data, error } = useSWR('/api/projects', fetcher as any)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <>
      <Text
        fontSize={3}
        fontWeight='bold'
        color='primary'
      >
        Projects
      </Text>

      {data.data.map((project: any) => (
        <Box key={project._id}>
          <Link
            href="/projects/[_id]"
            as={`/projects/${project._id}`}
            nav
          >
            <Text fontSize={2}>{project.name}</Text>
          </Link>
        </Box>
      ))}

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
