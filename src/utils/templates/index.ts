type TParam = {
  name: string
  uuid: string
}

export const getTemplate = ({ name, uuid }: TParam) => {
  return `
---
  uuid: ${uuid}
  name: ${name}
  createdAt: ${new Date()}
---
`.trim()
}
