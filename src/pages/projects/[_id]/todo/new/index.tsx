import React from 'react'
import { AddTodoForm } from '@/components/forms/AddTodo'
import { getProjects } from '@/api/projects'
import { GetStaticProps } from 'next'

type TProps = {
  projectId: string | null
}

const Page = ({ projectId }: TProps) => {

  return (
    <AddTodoForm projectId={projectId || undefined} onSubmitted={() => console.log('handleRefresh')} />
  )
}


export const getStaticPaths = async () => {
  const response = await getProjects()

  if (!response.ok) {
    return {
      fallback: true,
    } as const
  }

  const paths = response.data.map(project => ({ params: { _id: project._id }}))

  return {
    paths,
    fallback: false
  } as const
}


export const getStaticProps: GetStaticProps<TProps, { _id: string }> = async ({ params }) => ({
  props: {
    projectId: params ? params._id : null,
  }
})

export default Page
