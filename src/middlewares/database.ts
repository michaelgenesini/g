import { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb'
import nextConnect from 'next-connect'

const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT
const DB_NAME = process.env.DB_NAME
const DB_PROTOCOL = process.env.DB_PROTOCOL

const PORT = DB_PROTOCOL === 'mongodb+srv' ? '' : `:${DB_PORT}`

const mongoConnectionString = `${DB_PROTOCOL}://${DB_USER}:${DB_PASS}@${DB_HOST}${PORT}`

const client = new MongoClient(mongoConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

export type NextApiRequestWithDB = NextApiRequest & {
  db: any
  dbClient: any
}

export const database = async (req: NextApiRequest, res: NextApiResponse, next: any) => {

  if (!client.isConnected()) {
    await client.connect()
  }

  (req as NextApiRequestWithDB).db = client.db(DB_NAME)

  return next()
}
