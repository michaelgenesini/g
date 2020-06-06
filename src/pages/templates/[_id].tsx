import React from 'react'
import { GetStaticProps } from 'next'
import { Box, Text } from 'rebass'
import { parseISO, format } from 'date-fns'
import { getTemplate, getTemplates } from '@/api/templates'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'

type TProps = {
  template: {
    _id: string
    content: string
    createdAt: string
    name: string
  } | null
}

const Page = ({ template }: TProps) => {
  if (!template) {
    return <div>Template not found</div>
  }

  return (
    <>
      <Box mb={2}>
        <Text fontSize={3} fontWeight="bold">{template.name}</Text>
      </Box>

      <Box mb={2}>
        <Text color="muted">{format(parseISO(template.createdAt), 'dd MMMM p')}</Text>
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


export const getStaticProps:  GetStaticProps<TProps, { _id: string }> = async ({ params }) => {
  if (!params) {
    return {
      props: {
        template: null,
      },
    }
  }

  const response = await getTemplate(params._id)

  if (!response.ok) {
    return {
      props: {
        template: null
      }
    }
  }

  return {
    props: {
      template: response.data
    }
  }
}

export default Page
