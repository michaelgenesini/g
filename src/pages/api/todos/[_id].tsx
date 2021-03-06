import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { NextApiRequestWithDB } from '@/middlewares/database'
import { middlewares } from '@/middlewares'

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const objectId = req.query._id as string

  try {
    const doc = await (req as NextApiRequestWithDB).db
      .collection('todos')
      .aggregate([
        { $match : { _id : new ObjectId(objectId) } },
        {
          $lookup: {
            from: 'tasks',
            localField: '_id',
            foreignField: 'todo_id',
            as: 'tasks',
          },
        },
      ])
      .toArray()

    if (doc.length) {
      return res
        .status(200)
        .json({
          status: 'success',
          data: doc[0],
        })
    }

    return res
      .status(404)
      .json({ status: 'not found' })
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
      .collection('todos')
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
handler.delete(del)

export default handler
