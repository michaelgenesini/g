import fetch from 'node-fetch'

type TResponse<D extends any> = {
  data: D
  status: 'ok' | 'ko'
}

export const getProject = async (uuid: string) => {
  const res = await fetch(`http://localhost:3001/api/projects/${uuid}`)
  const data = await res.json()

  return data as TResponse<{
    _id: string
    createdAt: string
    name: string
    notes: string[]
  }>
}

export const getProjects = async () => {
  const res = await fetch('http://localhost:3001/api/projects')
  const data = await res.json()

  return data as TResponse<{
    _id: string
    createdAt: string
    name: string
    notes: string[]
  }[]>
}

export const addProject = async ({ name }: { name: string }) => {
  const res = await fetch('http://localhost:3001/api/projects', {
    method: 'put',
    body: JSON.stringify({ name })
  })
  const data = await res.json()

  return data
}
