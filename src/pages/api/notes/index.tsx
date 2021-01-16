import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { middlewares } from '@/middlewares'
import { NextApiRequestWithDB } from '@/middlewares/database'
import { ObjectID } from 'mongodb'

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const doc = await (req as NextApiRequestWithDB).db
      .collection('notes')
      .find()
      .toArray()

    return res
      .status(200)
      .json({
        status: 'success',
        data: doc,
      })
  } catch (error) {
    return res
      .status(400)
      .json({
        error,
        status: 'error',
      })
  }
}

type TPayload = {
  content: string
  name?: string
  project_id?: string
}

const put = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const payload = JSON.parse(req.body) as TPayload

    const { name, project_id } = payload

    if (!name) throw 'Missing field: name'

    const date = new Date()

    const doc = await (req as NextApiRequestWithDB).db
      .collection('notes')
      .insertOne({
        name,
        content: payload.content,
        status: 'NEW',
        createdAt: date.toISOString(),
        project_id: new ObjectID(project_id),
      })

    return res
      .status(200)
      .json({
        status: 'success',
        data: doc,
      })
  } catch (error) {
    return res
      .status(400)
      .json({
        error,
        status: 'error',
      })
  }
}

const handler = nextConnect()

handler.use(middlewares)
handler.get(get)
handler.put(put)

export default handler
