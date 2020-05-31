import fetch from 'node-fetch'

type TResponse<D extends any> = {
  data: D
  status: 'ok' | 'ko'
}

export const getNote = async (uuid: string) => {
  const res = await fetch(`http://localhost:3001/api/notes/${uuid}`)
  const data = await res.json()

  return data as TResponse<{
    _id: string
    content: string
    createdAt: string
    name: string
  }>
}

export const getNotes = async () => {
  const res = await fetch('http://localhost:3001/api/notes')
  const data = await res.json()


  return data as TResponse<{
    _id: string
    createdAt: string
    name: string
  }[]>
}

export const addNote = async ({
  content,
  name,
  project_id,
}: { content: string, name: string, project_id?: string }) => {
  const res = await fetch('http://localhost:3001/api/notes', {
    method: 'put',
    body: JSON.stringify({ content, name, project_id })
  })
  const data = await res.json()

  return data
}
