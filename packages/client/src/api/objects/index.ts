import fetch from 'node-fetch'

export const getObjects = async () => {
  const res = await fetch('http://localhost:3000/objects')
  const data = await res.json()

  return data
}

export const addObject = async ({ name }: { name: string }) => {
  const res = await fetch('http://localhost:3000/objects', {
    method: 'post',
    body: JSON.stringify({ name })
  })
  const data = await res.json()

  return data
}
