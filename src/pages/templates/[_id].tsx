import React from 'react'
import { GetStaticProps } from 'next'
import { Box, Text } from 'rebass'
import { parseISO, format } from 'date-fns'
import { getTemplate, getTemplates } from '@/api/templates'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import useSWR from 'swr'

type TProps = {
  templateId: string | null
}

const Page = ({ templateId }: TProps) => {
  if (!templateId) return <>Template not found</>

  const { data: response } = useSWR(`template-${templateId}`, () => getTemplate(templateId))

  if (!response) return <>loading...</>
  if (!response.ok) return <>error</>

  const template = response.data

  return (
    <>
      <Box mb={2}>
        <Text fontSize={3} fontWeight="bold">{template.name}</Text>
      </Box>

      <Box mb={2}>
        <Text color="gray">{format(parseISO(template.createdAt), 'dd MMMM p')}</Text>
      </Box>

      <Box mb={3} height={1} width={1} bg='gray' />

      <Box mb={2} p={3}>
        <MarkdownRenderer source={template.content} />
      </Box>
    </>
  )
}

export const getStaticPaths = async () => {
  const response = await getTemplates()

  if (!response.ok) {
    return {
      fallback: true,
    } as const
  }

  const paths = response.data.map(object => ({ params: { _id: object._id }}))

  return {
    paths,
    fallback: false
  } as const
}


export const getStaticProps:  GetStaticProps<TProps, { _id: string }> = async ({ params }) => ({
  props: {
    templateId: params ? params._id : null
  }
})

export default Page
