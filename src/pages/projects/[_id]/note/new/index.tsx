import React from 'react'
import { AddNoteForm } from '@/components/forms/AddNote'
import { getProjects, getProject } from '@/api/projects'
import { GetStaticProps } from 'next'

type TProps = {
  projectId?: string
}

const Page = ({ projectId }: TProps) => {

  console.log({ projectId })

  return (
    <AddNoteForm projectId={projectId} onSubmitted={() => console.log('handleRefresh')} />
  )
}

export const getStaticPaths = async () => {
  const response = await getProjects()
  const paths = response.data.map(project => ({ params: { _id: project._id }}))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<TProps, { _id: string }> = async ({ params }) => {
  if (!params) return { props: { projectId: undefined }}

  return {
    props: {
      projectId: params._id,
    }
  }
}

export default Page
