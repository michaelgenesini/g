import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { middlewares } from '@/middlewares'
import { NextApiRequestWithDB } from '@/middlewares/database'
import { ObjectID } from 'mongodb'

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const doc = await (req as NextApiRequestWithDB).db
      .collection('tasks')
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
  todo_id?: string
}

const put = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const payload = JSON.parse(req.body) as TPayload

    const { content, todo_id } = payload

    if (!content) throw 'Missing field: content'

    const date = new Date()

    const doc = await (req as NextApiRequestWithDB).db
      .collection('tasks')
      .insertOne({
        content,
        archived: false,
        completed: false,
        createdAt: date.toISOString(),
        status: 'NEW',
        todo_id: new ObjectID(todo_id),
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
