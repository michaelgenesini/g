import { ObjectId, ObjectID } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import nextConnect from 'next-connect'
import { middlewares } from '@/middlewares'
import { NextApiRequestWithDB } from '@/middlewares/database'

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
            localField: '_id',
            foreignField: 'project_id',
            as: 'notes'
          }
        },
        {
          $lookup: {
            from: 'templates',
            localField: '_id',
            foreignField: 'project_id',
            as: 'templates'
          }
        },
        {
          $lookup: {
            from: 'todos',
            localField: '_id',
            foreignField: 'project_id',
            as: 'todos'
          }
        },
        {
          $unwind: {
            path: '$todos',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: 'tasks',
            localField: 'todos._id',
            foreignField: 'todo_id',
            as: 'todos.tasks',
          },
        },
        {
          $group: {
            _id: '$_id',
            createdAt: { '$first': '$createdAt' },
            emoji: { '$first': '$emoji' },
            name: { '$first': '$name' },
            notes: { '$first': '$notes' },
            templates: { '$first': '$templates' },
            todos: { '$push': '$todos' },
            todos_expanded: { '$first': '$todos_expanded' },
            view: { '$first': '$view' },
          }
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

type TPayload = {
  view?: 'LIST' | 'KAMBAN'
}

const update = async (req: NextApiRequest, res: NextApiResponse) => {
  const objectId = req.query._id as string

  try {
    const payload = JSON.parse(req.body) as TPayload

    const view = payload.view

    const doc = await (req as NextApiRequestWithDB).db
      .collection('projects')
      .updateOne(
        { _id: new ObjectID(objectId) },
        { $set: { view }},
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
      .collection('projects')
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
