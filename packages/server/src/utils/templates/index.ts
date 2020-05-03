type TParam = {
  name: string
  uuid: string
}

export const getTemplate = ({ name, uuid }: TParam) => {
  const date = new Date()

  return `
---
  uuid: ${uuid}
  name: ${name}
  createdAt: ${date.toISOString()}
---
`.trim()
}
