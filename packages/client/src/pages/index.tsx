import React, { useCallback, useState } from 'react'
import { getObjects } from '@/api/objects'
import { AddObject } from '@/components/forms/AddObject'

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
    <div>
      <h1>g - your workflow's butler</h1>
      <h2>There are your objects:</h2>
      <div>
        {objects.map((object) => (
          <div key={object.uuid}>
            <span>{object.name}</span>
            <br />
            <span>{object.createdAt}</span>
            <hr />
          </div>
        ))}
      </div>
      <hr />
      <AddObject onSubmitted={handleRefresh} />
    </div>
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
