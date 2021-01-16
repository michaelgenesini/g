import React from 'react'
import useSWR from 'swr'
import { GetStaticProps } from 'next'
import { getProject, getProjects } from '@/api/projects'
import { Project } from '@/components/Project'

type TProps = {
  projectId: string | null
}

const Page = ({ projectId }: TProps) => {
  if (!projectId) return <>Project not found</>

  const { data: response } = useSWR(`project-${projectId}`, () => getProject(projectId))

  if (!response) return <>loading...</>
  if (!response.ok) return <>error</>

  const project = response.data

  return (
    <Project project={project} />
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
    projectId: params ? params._id : null
  }
})

export default Page
