import path from 'path'
import { promises as fsPromises } from 'fs'
import matter from 'gray-matter'
import { projectsPath } from '@/constants/path'
import { getProjectTemplate } from '@/utils/templates/project'

export const getData = async () => {
  try {
    const filesNames = await fsPromises.readdir(`${projectsPath}`)

    const files = await Promise.all(
      filesNames
        .filter(file => path.extname(file).toLowerCase() === '.md')
        .map(name => fsPromises.readFile(`${projectsPath}/${name}`, 'utf-8'))
    )
    const objects = files.map(file => matter(file))

    return {
      ok: true as true,
      data: objects.map(object => object.data),
    }
  } catch(error) {
    return { ok: false as false }
  }
}

export const addData = async ({ name, uuid }: { name: string, uuid: string }) => {
  try {
    const template = getProjectTemplate({
      name,
      uuid,
    })

    await fsPromises.writeFile(`${projectsPath}/${uuid}.md`, template)

    return { ok: true }
  } catch(error) {
    return { ok: false }
  }
}
