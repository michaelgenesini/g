import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { dbMiddleware, NextApiRequestWithDB } from '@/middlewares/database'
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

    const name = payload.name

    if (!name) throw 'Missing field: name'

    const date = new Date()

    const doc = await (req as NextApiRequestWithDB).db
      .collection('notes')
      .insertOne({
        name,
        content: payload.content,
        createdAt: date.toISOString(),
      })

    if (payload.project_id !== undefined) {
      await (req as NextApiRequestWithDB).db
        .collection('projects')
        .updateOne(
          { _id: new ObjectID(payload.project_id) },
          { $push: { notes: doc.insertedId } },
        )
    }

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

handler.use(dbMiddleware)


handler.use(async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return get(req, res)
    case 'PUT':
      return put(req, res)
    default:
      return res.status(400).json({ status: 'error' })
  }
})

export default handler
