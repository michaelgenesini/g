import { ObjectID } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { middlewares } from '@/middlewares'
import { NextApiRequestWithDB } from '@/middlewares/database'

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const doc = await (req as NextApiRequestWithDB).db
      .collection('templates')
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
  name?: string
  content: string
  project_id?: string
}

const put = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const payload = JSON.parse(req.body) as TPayload

    const name = payload.name

    if (!name) throw 'Missing field: name'

    const date = new Date()

    const doc = await (req as NextApiRequestWithDB).db
      .collection('templates')
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
          { $push: { templates: doc.insertedId } },
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

handler.use(middlewares)

handler.get(get)
handler.put(put)

export default handler
