import { ObjectId, ObjectID } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { NextApiRequestWithDB } from '@/middlewares/database'
import { middlewares } from '@/middlewares'

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const objectId = req.query._id as string

  try {
    const doc = await (req as NextApiRequestWithDB).db
      .collection('tasks')
      .findOne({ '_id' : new ObjectId(objectId) })

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
  completed: boolean
}

const update = async (req: NextApiRequest, res: NextApiResponse) => {
  const objectId = req.query._id as string

  try {
    const payload = JSON.parse(req.body) as TPayload

    const completed = payload.completed

    const doc = await (req as NextApiRequestWithDB).db
      .collection('tasks')
      .updateOne(
        { _id: new ObjectID(objectId) },
        { $set: { completed } },
      )

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

const del = async (req: NextApiRequest, res: NextApiResponse) => {
  const objectId = req.query._id as string

  try {
    const doc = await (req as NextApiRequestWithDB).db
      .collection('tasks')
      .deleteOne({ _id : new ObjectId(objectId) })

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
handler.post(update)
handler.delete(del)

export default handler
