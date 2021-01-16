import React, { useCallback, useState, useEffect } from 'react'
import { Box, Text, Flex, Heading } from 'rebass'
import { parseISO, format, formatDistanceToNowStrict } from 'date-fns'
import { Label, Select } from '@rebass/forms'
import { TProjectAggregate } from '@/types'
import { mutate } from 'swr'
import { updateProject } from '@/api/projects'
import { View } from './View'

const viewOptions = [
  { name: 'LIST' },
  { name: 'KAMBAN' },
]

type TProps = {
  project: TProjectAggregate
}

export const Project = ({ project }: TProps) => {
  const [selectedView, setSelectedView] = useState('LIST')

  useEffect(() => {
    setSelectedView(project.view)
  }, [project])

  const handleChangeView = useCallback(async (e: any) => {
    await updateProject({ _id: project._id, view:  e.target.value })

    mutate(`project-${project._id}`)
  }, [project, selectedView])

  console.log({ project })

  return (
    <>
      <Flex alignItems="flex-end" justifyContent="space-between" mb={3}>
        <Flex flexDirection="column">
          <Text color="gray">{formatDistanceToNowStrict(parseISO(project.createdAt), { addSuffix: true })}</Text>
          {/* <Text color="gray">{format(parseISO(project.createdAt), 'dd MMMM p')}</Text> */}

          <Flex alignItems="center" mb={2}>
            <Heading as='h1' fontSize={5}>{project.emoji.native} {project.name}</Heading>
          </Flex>
        </Flex>

        <Box width={200}>
          <Label>Select a view:</Label>
          <Select name={`project-${project._id}`} onChange={handleChangeView} value={selectedView}>
            {viewOptions.map(view => <option key={view.name} value={view.name}>{view.name}</option>)}
          </Select>
        </Box>
      </Flex>

      <Box mb={4} bg="gray" width={1} height={1} />


      <View project={project} />
    </>
  )
}
