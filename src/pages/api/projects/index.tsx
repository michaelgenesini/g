import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { middlewares } from '@/middlewares'
import { NextApiRequestWithDB } from '@/middlewares/database'
import { BaseEmoji } from 'emoji-mart'

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const doc = await (req as NextApiRequestWithDB).db
      .collection('projects')
      .aggregate([{
        $lookup: {
          from: 'notes',
          localField: 'notes',
          foreignField: '_id',
          as: 'notes',
        }
      }])
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
  emoji: BaseEmoji
  name?: string
}

const put = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const payload = JSON.parse(req.body) as TPayload

    const name = payload.name
    const emoji = payload.emoji

    if (!name) throw 'Missing field: name'
    if (!emoji) throw 'Missing field: emoji'

    const date = new Date()

    const doc = await (req as NextApiRequestWithDB).db
      .collection('projects')
      .insertOne({
        emoji,
        name,
        createdAt: date.toISOString(),
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
