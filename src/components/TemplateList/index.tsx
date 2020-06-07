import React, { useCallback, SyntheticEvent } from 'react'
import { parseISO, format, formatDistanceToNowStrict } from 'date-fns'
import { Box, Card, Text, Flex } from 'rebass'
import { deleteTemplate } from '@/api/templates'
import { Link } from '@/components/Link'
import { TTemplate } from '@/types'

type TProps = {
  template: TTemplate
}

export const TemplateList = ({ template }: TProps) => {
  const handleDelete = useCallback(async (event: SyntheticEvent) => {
    event.preventDefault()
    event.stopPropagation()

    if (typeof window !== 'undefined') {
      const ok = window.confirm('Are you sure to delete the project?')

      if (ok) {
        await deleteTemplate(template._id)
      }
    }

  }, [template])

  return (
    <Box mb={3}>
      <Link
        href="/templates/[_id]"
        as={`/templates/${template._id}`}
        unstyled
      >
        <Card>
          <Flex>
            <Flex flex={1} flexDirection="column">
              <Text fontSize={3} fontWeight="bold">{template.name}</Text>
              <Text color="muted">{formatDistanceToNowStrict(parseISO(template.createdAt), { addSuffix: true })}</Text>
            </Flex>

            <Flex flexDirection="column" justifyContent="flex-end">
              <Text color="muted" onClick={handleDelete}>🗑</Text>
            </Flex>
          </Flex>
        </Card>
      </Link>
    </Box>
  )
}
