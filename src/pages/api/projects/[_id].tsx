import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { dbMiddleware, NextApiRequestWithDB } from '@/middlewares/database'

const handler = nextConnect()

handler.use(dbMiddleware)

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const objectId = req.query._id as string

  try {
    const doc = await (req as NextApiRequestWithDB).db
      .collection('projects')
      .aggregate([
        { $match : { _id : new ObjectId(objectId) } },
        {
          $lookup: {
            from: 'notes',
            localField: 'notes',
            foreignField: '_id',
            as: 'notes',
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
    .json({ status: 'not fount' })
  } catch (error) {
    return res
      .status(400)
      .json({
        error,
        status: 'error',
      })
  }
}


handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return get(req, res)
    default:
      return res.status(400).json({ status: 'error' })
  }
})

export default handler
