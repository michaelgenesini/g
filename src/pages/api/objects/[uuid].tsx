import { NextApiRequest, NextApiResponse } from 'next'
import { getData } from '@/utils/api'

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  const objectUuid = req.query.uuid
  const allData = await getData(true)

  if (!allData.ok) {
    return res
      .status(500)
      .json({ status: 'error' })
  }

  const data = allData.data.filter(object => object.uuid === objectUuid)

  if (data.length) {
    return res
      .status(200)
      .json({
        status: 'success',
        data: data[0],
      })
  }

  return res
    .status(404)
    .json({ status: 'not fount' })
}


export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      return get(req, res)
    default:
      return res.status(400).json({ status: 'error' })
  }
}
