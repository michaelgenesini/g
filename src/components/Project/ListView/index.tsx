import React, { SyntheticEvent, useMemo, useCallback, useState } from 'react'
import useSWR from 'swr'
import { Box, Text, Card, Flex, Heading } from 'rebass'
import { GetStaticProps } from 'next'
import { parseISO, format } from 'date-fns'
import { Checkbox, Label, Select } from '@rebass/forms'
import { getProject, getProjects, updateProject } from '@/api/projects'
import { Link } from '@/components/Link'
import { TTemplate, TProjectAggregate } from '@/types'
import { TaskList } from '@/components/TaskList'

type TProps = {
  project: TProjectAggregate
}

export const ListView = ({ project }: TProps) => {
  const [expandTodo, setExpandTodo] = useState(project.todos_expanded)

  const handleExpandTodo = useCallback(async () => {
    const response = await updateProject({
      _id: project._id,
      todos_expanded: !expandTodo,
    })

    setExpandTodo(value => !value)

    console.log({ response })
  }, [expandTodo, project])

  return (
    <>
      <Flex flex={1} justifyContent="center" mt={2}>
        <Flex flexDirection="column" width={800}>

          {(project.notes.length === 0 && project.todos.length === 0) && (
            <Box mb={4}>
              <Text color="gray">Nothing in this project</Text>
            </Box>
          )}

          {project.notes
            .map((object) => (
              <Box key={object._id} mb={4}>
                <Link
                  href="/notes/[_id]"
                  as={`/notes/${object._id}`}
                  unstyled
                >
                  <Box mb={4}>
                    <Text fontSize={3} fontWeight="bold"><Box as="span" mr={2}>📝</Box> {object.name}</Text>
                    <Text color="gray">status: {object.status}</Text>
                  </Box>
                  <Box bg="gray" width={1} height={1} />
                </Link>
              </Box>
            ))
          }

          {project.todos
            .map((object: any) => (
              <Box key={object._id} mb={4}>
                <Box mb={4}>
                  <Link
                    href="/todos/[_id]"
                    as={`/todos/${object._id}`}
                    unstyled
                  >
                    <Text fontSize={3} fontWeight="bold"><Box as="span" mr={2}>✅</Box> {object.name}</Text>
                  </Link>
                  {expandTodo && (
                    <TaskList project={project} todo={object} />
                  )}
                </Box>
                <Box bg="gray" width={1} height={1} />
              </Box>
            ))}
        </Flex>
      </Flex>

      <Flex justifyContent="flex-end" mt={4}>
        <Flex mr={4}>
          <Link
            as={`/projects/${project._id}/todo/new`}
            href="/projects/[_id]/todo/new"
            nav
          >
            <Flex alignItems="center">
              <Box mr={2}>
                <Text fontSize={3} color="primary">+</Text>
              </Box>
              <Text>Add todo</Text>
            </Flex>
          </Link>
        </Flex>

        <Flex mr={4}>
          <Link
            as={`/projects/${project._id}/note/new`}
            href="/projects/[_id]/note/new"
            nav
          >
            <Flex alignItems="center">
              <Box mr={2}>
                <Text fontSize={3} color="primary">+</Text>
              </Box>
              <Text>Add note</Text>
            </Flex>
          </Link>

          {/* <Flex>
            {project.templates.length > 0 && (
              <Box width={200} mr={2}>
                <Select
                  id='template'
                  name='template'
                  defaultValue='no template'>
                  {project.templates
                    .concat({ _id: '0', name: 'Empty template', createdAt: '', content: '' })
                    .map((template: TTemplate) => (
                      <option key={template._id}>
                        {template.name}
                      </option>
                    ))
                  }
                </Select>
              </Box>
            )}
          </Flex> */}
        </Flex>

        <Flex mr={4}>
          <Link
            as={`/projects/${project._id}/template/new`}
            href="/projects/[_id]/template/new"
            nav
          >
            <Flex alignItems="center">
              <Box mr={2}>
                <Text fontSize={3} color="primary">+</Text>
              </Box>
              <Text>Add template</Text>
            </Flex>
          </Link>
        </Flex>

        <Flex alignItems="center" mr={4}>
          <Label>
            <Checkbox onChange={handleExpandTodo} checked={expandTodo}/> Expand todo
          </Label>
        </Flex>
      </Flex>
    </>
  )
}
