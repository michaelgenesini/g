import { promises as fsPromises } from 'fs'
import { json, send } from 'micro'
import { AugmentedRequestHandler } from 'microrouter'
import { data } from '../../../constants/paths'
import { getUuid } from '../../../utils/uuid'
import { getTemplate } from '../../../utils/templates'

type TPayload = { name: string }

export const indexObjectPost: AugmentedRequestHandler = async (req, res) => {
  const uuid = getUuid()
  res.setHeader('Access-Control-Allow-Origin', '*')

  try {
    const payload = (await json(req)) as TPayload

    const name = payload.name

    if (!name) throw 'Missing field: name'

    const template = getTemplate({ name, uuid })

    await fsPromises.writeFile(`${data}/${uuid}.md`, template)
  } catch (err) {
    return send(res, 400, {
      status: 'error',
      error: `Error: ${JSON.stringify(err)}`
    })
  }

  send(res, 200, {
    status: 'success',
    data: uuid
  })
}
