import React, { useCallback, useState } from 'react'
import Link from 'next/link'
import { compareDesc } from 'date-fns'
import { getObjects } from '@/api/objects'
import { AddObject } from '@/components/forms/AddObject'
import {
  Box,
  Card,
  Heading,
  Text,
  Flex
} from 'rebass'

type TProps = {
  objects: {
    createdAt: string
    name: string
    uuid: string
  }[]
}

const Page = (props: TProps) => {
  const [objects, setObjects] = useState(props.objects)

  const handleRefresh = useCallback(() => {
    const run = async () => {
      const data = await getObjects()

      setObjects(data.data)
    }

    run().catch(console.error)
  }, [setObjects])

  return (
    <>
      <Box mb={2}>
        <Heading  as='h1'>
          Your objects:
        </Heading>
      </Box>

      <Flex>

        <Box
          width={[ 1, 1/2 ]}
          mr={[0, 4]}
        >
          {objects
            .sort((a, b) => compareDesc(new Date(a.createdAt), new Date(b.createdAt)))
            .map((object) => (
              <Box key={object.uuid} mb={3} width={[1]}>
                <Card>
                  <Link
                    href="/objects/[uuid]"
                    as={`/objects/${object.uuid}`}
                  >
                    <a>
                      <Text>{object.name}</Text>
                      <Text>{object.createdAt}</Text>
                    </a>
                  </Link>
                </Card>
              </Box>
            ))
          }
        </Box>

        <Box width={[ 1, 1/2 ]}>
          <AddObject onSubmitted={handleRefresh} />
        </Box>
      </Flex>
    </>
  )
}

export const getStaticProps = async () => {
  const data = await getObjects()

  return {
    props: {
      objects: data.data
    }
  }
}

export default Page
