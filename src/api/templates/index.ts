import { fetcher } from '@/utils/api'
import { TTemplate } from '@/types'

export const getTemplate = async (uuid: string) => fetcher<TTemplate>(
  `http://localhost:3001/api/templates/${uuid}`,
)

export const getTemplates = async () => fetcher<TTemplate[]>(
  `http://localhost:3001/api/templates`,
)

type TAddTemplate = Pick<TTemplate, 'content' | 'name'> & {
  project_id?: string
}

export const addTemplate = async ({ content, name, project_id }: TAddTemplate) => fetcher(
  'http://localhost:3001/api/templates',
  {
    method: 'put',
    body: JSON.stringify({ content, name, project_id })
  },
)

export const deleteTemplate = async (uuid: string) => fetcher(
  `http://localhost:3001/api/templates/${uuid}`,
  {
    method: 'delete',
  },
)

