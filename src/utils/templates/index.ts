type TParam = {
  content?: string
  name: string
  uuid: string
}

export const getTemplate = ({ content = '', name, uuid }: TParam) => {
  const date = new Date()

  return `
---
  uuid: ${uuid}
  name: ${name}
  createdAt: ${date.toISOString()}
---
  ${content}
`.trim()
}
