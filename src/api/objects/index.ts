import fetch from 'node-fetch'

type TResponse<D extends any> = {
  data: D
  status: 'ok' | 'ko'
}

export const getObject = async ({ uuid }: { uuid: string }) => {
  const res = await fetch(`http://localhost:3001/api/objects/${uuid}`)
  const data = await res.json()

  return data as TResponse<{
    content: string
    createdAt: string
    name: string
    uuid: string
  }>
}

export const getObjects = async () => {
  const res = await fetch('http://localhost:3001/api/objects')
  const data = await res.json()

  return data as TResponse<{
    createdAt: string
    name: string
    uuid: string
  }[]>
}

export const addObject = async ({ content, name }: { content: string, name: string }) => {
  const res = await fetch('http://localhost:3001/api/objects', {
    method: 'put',
    body: JSON.stringify({ content, name })
  })
  const data = await res.json()

  return data
}
