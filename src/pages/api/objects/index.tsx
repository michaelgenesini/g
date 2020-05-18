import { NextApiRequest, NextApiResponse } from 'next'
import { promises as fsPromises } from 'fs'
import { getData, addData } from '@/utils/api'
import { getUuid } from '@/utils/uuid'

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await getData()

  if (!data.ok) {
    return res
      .status(500)
      .json({ status: 'error' })
  }

  return res
    .status(200)
    .json({
      status: 'success',
      data: data.data,
    })
}

type TPayload = {
  content: string
  name?: string
}

const put = async (req: NextApiRequest, res: NextApiResponse) => {
  const uuid = getUuid()

  try {
    const payload = JSON.parse(req.body) as TPayload

    const name = payload.name

    if (!name) throw 'Missing field: name'

    await addData({
      name,
      uuid,
      content: payload.content,
    })
  } catch (err) {
    return res
      .status(400)
      .json({
        status: 'error',
        error: `Error: ${JSON.stringify(err)}`
      })
  }

  return res
  .status(200)
  .json({
    status: 'success',
    data: uuid
  })
}


export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return get(req, res)
    case 'PUT':
      return put(req, res)
    default:
      return res.status(400).json({ status: 'error' })
  }
}
