import React from 'react'
import ReactMarkdown from 'react-markdown'
import { GetStaticProps } from 'next'
import { getObject, getObjects } from '@/api/objects'
import { Box, Heading, Text } from 'rebass'

type TProps = {
  object?: {
    content: string
    createdAt: string
    name: string
    uuid: string
  }
}

const Page = ({ object }: TProps) => {
  if (!object) {
    return <div>Object not found</div>
  }

  return (
    <>
      <Box mb={2}>
        <Heading  as='h1'>
          {object.name}
        </Heading>
      </Box>

      <Box mb={2}>
        <Text>{object.createdAt}</Text>
      </Box>

      <Box mb={2}>
        <ReactMarkdown source={object.content} />
      </Box>
    </>
  )
}

export const getStaticPaths = async () => {
  const response = await getObjects()
  const paths = response.data.map(object => ({ params: { uuid: object.uuid }}))

  return {
    paths,
    fallback: false
  }
}


export const getStaticProps: GetStaticProps<TProps, { uuid: string }> = async ({ params }) => {
  if (!params) return { props: { object: undefined }}

  const response = await getObject({ uuid: params.uuid })

  return {
    props: {
      object: response.data
    }
  }
}

export default Page
