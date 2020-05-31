import path from 'path'
import { promises as fsPromises } from 'fs'
import matter from 'gray-matter'
import { notesPath } from '@/constants/path'
import { getNoteTemplate } from '@/utils/templates/note'

export const getData = async (withContent = false) => {
  try {
    const filesNames = await fsPromises.readdir(`${notesPath}`)

    const files = await Promise.all(
      filesNames
        .filter(file => path.extname(file).toLowerCase() === '.md')
        .map(name => fsPromises.readFile(`${notesPath}/${name}`, 'utf-8'))
    )
    const objects = files.map(file => matter(file))

    if (withContent) {
      return {
        ok: true as true,
        data: objects.map(object => ({
          ...object.data,
          content: object.content,
        })),
      }
    }

    return {
      ok: true as true,
      data: objects.map(object => object.data),
    }
  } catch(error) {
    return { ok: false as false }
  }
}

export const addData = async ({ content, name, uuid }: { content: string, name: string, uuid: string }) => {
  try {
    const template = getNoteTemplate({
      content,
      name,
      uuid,
    })

    await fsPromises.writeFile(`${notesPath}/${uuid}.md`, template)

    return { ok: true }
  } catch(error) {
    return { ok: false }
  }
}
