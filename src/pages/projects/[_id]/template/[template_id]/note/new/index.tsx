import React from 'react'
import { AddNoteForm } from '@/components/forms/AddNote'
import { getProjects } from '@/api/projects'
import { GetStaticProps } from 'next'
import { getTemplates, getTemplate } from '@/api/templates'
import useSWR from 'swr'
import { fetcher } from '@/utils/api'

type TProps = {
  projectId: string | null
  templateId: string | null
}

const Page = ({ projectId, templateId }: TProps) => {
  const { data, error } = useSWR(templateId, getTemplate)

  if (error) return <div>failed to load template</div>
  if (!data) return <div>loading template...</div>

  const template = data.ok
    ? data.data.content
    : ''

  return (
    <AddNoteForm
      projectId={projectId || undefined}
      template={template}
      onSubmitted={() => console.log('handleRefresh')}
    />
  )
}


export const getStaticPaths = async () => {
  const responses = await Promise.all([
    getProjects(),
    getTemplates(),
  ])

  if (responses.some(response => !response.ok)) {
    return {
      fallback: true,
    } as const
  }

  const [projectResponse, templateResponse] = responses

  const projectPaths = projectResponse.data!.map(project => ({ params: { _id: project._id }}))
  const templatePaths = templateResponse.data!.map(template => ({ params: { template_id: template._id }}))

  const paths = projectPaths.reduce<{ params: {_id: string, template_id: string } }[]>(
    (acc, projectPath) => {
      return [
        ...acc,
        ...templatePaths.map(templatePath => ({
          params: {
            ...templatePath.params,
            _id: projectPath.params._id,
          },
        }))
      ]
    },
    [],
  )

  console.log(paths)

  return {
    paths,
    fallback: false
  } as const
}


export const getStaticProps: GetStaticProps<TProps, { _id: string, template_id: string }> = async ({ params }) => {
  if (!params) {
    return {
      props: {
        projectId: null,
        templateId: null,
      },
    }
  }

  return {
    props: {
      projectId: params._id,
      templateId: params.template_id,
    }
  }
}

export default Page
