export const replaceTemplate = (content?: string) => {
  if (!content) {
    return ''
  }

  const date = new Date()

  return content
    .replace('{{template.date}}', date.toDateString())
}
