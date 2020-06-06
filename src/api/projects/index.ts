import { fetcher } from '@/utils/api'
import { TProject, TProjectAggregate } from '@/types'

export const getProject = async (uuid: string) => fetcher<TProjectAggregate>(
  `http://localhost:3001/api/projects/${uuid}`,
)

export const getProjects = async () => fetcher<TProject[]>(
  `http://localhost:3001/api/projects`,
)

export const addProject = async ({ name }: { name: string }) => fetcher(
  'http://localhost:3001/api/projects',
  {
    method: 'put',
    body: JSON.stringify({ name })
  },
)

export const deleteProject = async (uuid: string) => fetcher(
  `http://localhost:3001/api/projects/${uuid}`,
  {
    method: 'delete',
  },
)

