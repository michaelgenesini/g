import React from 'react'
import { compareDesc } from 'date-fns'
import { Box, Heading, Text, Flex } from 'rebass'
import { getTemplates } from '@/api/templates'
import { Link } from '@/components/Link'
import { TemplateList } from '@/components/TemplateList'
import useSWR from 'swr'

const Page = () => {
  const { data: response } = useSWR('templates', () => getTemplates())

  if (!response) return <>loading...</>
  if (!response.ok) return <>error</>

  return (
    <>
      <Box mb={3}>
        <Heading as='h1' fontSize={6}>Templates</Heading>
      </Box>

      <Box>
        {response.data
          .sort((a, b) => compareDesc(new Date(a.createdAt), new Date(b.createdAt)))
          .map((object) => (
            <TemplateList key={object._id} template={object} />
          ))
        }

        <Link href="/templates/new" nav>
          <Flex alignItems="center">
            <Box mr={2}>
              <Text fontSize={3} color="primary">+</Text>
            </Box>
            <Text>Add templates</Text>
          </Flex>
        </Link>
      </Box>
    </>
  )
}

export default Page
