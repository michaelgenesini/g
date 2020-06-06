import React from 'react'
import { useForm } from 'react-hook-form'
import { Card, Flex, Box, Heading } from 'rebass'
import { Label, Input } from '@rebass/forms'
import { Link } from '@/components/Link'

export const Header = () => {
  const { handleSubmit, register, errors } = useForm()
  const onSubmit = (values: any) => console.log(values)

  return (
    <Card>
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center" flex={1}>
          <Flex mr={2} flexShrink={0}>
            <Link href="/" nav>
              <Heading as="p">
                G
              </Heading>
            </Link>
          </Flex>

          <Flex width={400} flexShrink={1}>
            <Box
              as="form"
              onSubmit={handleSubmit(onSubmit)}
              width={1}
            >
              <Input
                name="search"
                ref={register()}
                placeholder="Search..."
                autoComplete="off"
              />
            </Box>
          </Flex>
        </Flex>

        <Flex flexShrink={0}>
          <Box ml={3}>
            <Link href="/projects" nav>
              Projects
            </Link>
          </Box>

          <Box ml={3}>
            <Link href="/notes" nav>
              Notes
            </Link>
          </Box>

          <Box ml={3}>
            <Link href="/todos" nav>
              Todos
            </Link>
          </Box>

          <Box ml={3}>
            <Link href="/events" nav>
              Events
            </Link>
          </Box>

          <Box ml={3}>
            <Link href="/templates" nav>
              Templates
            </Link>
          </Box>

          <Box ml={3}>
            <Link href="/actions" nav>
              Actions
            </Link>
          </Box>

          <Box ml={3}>
            <Link href="/workflows" nav>
              Workflows
            </Link>
          </Box>
        </Flex>
      </Flex>
    </Card>
  )
}
