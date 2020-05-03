import { promises as fsPromises } from 'fs'
import { send } from 'micro'
import { AugmentedRequestHandler } from 'microrouter'
import unified from 'unified'
import parse from 'remark-parse'
import frontmatter from 'remark-frontmatter'
import parseFrontmatter from 'remark-parse-yaml'
import yaml from 'js-yaml'
import { data as dataPath } from '../../../constants/paths'

const processor = unified()
  .use(parse)
  .use(frontmatter)
  .use(parseFrontmatter)

export const indexObjectGetAll: AugmentedRequestHandler = async (_, res) => {
  const filesNames = await fsPromises.readdir(`${dataPath}`)
  const files = await Promise.all(filesNames.map(name => fsPromises.readFile(`${dataPath}/${name}`, 'utf-8')))
  const objects = files.map(processor.parse)
  const data = objects
    .map(({ children }: any) => children
      .filter((node: any) => node.type === 'yaml')
      .map((content: any) => yaml.load(content.value))[0]
    )

  res.setHeader('Access-Control-Allow-Origin', '*')

  send(res, 200, {
    status: 'success',
    data,
  })
}

export const indexObjectGet: AugmentedRequestHandler = async (req, res) => {
  const objectUuid = req.params.objectUuid

  const filesNames = await fsPromises.readdir(`${dataPath}`)
  const files = await Promise.all(filesNames.map(name => fsPromises.readFile(`${dataPath}/${name}`, 'utf-8')))
  const objects = files.map(processor.parse)
  const data = objects
    .map(({ children }: any) => children
      .filter((node: any) => node.type === 'yaml')
      .map((content: any) => yaml.load(content.value))[0]
    )
    .filter(object => object.uuid === objectUuid)

  res.setHeader('Access-Control-Allow-Origin', '*')

  send(res, 200, {
    status: 'success',
    data,
  })
}
