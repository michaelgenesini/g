import nextConnect from 'next-connect'
import { database } from './database'

const middlewares = nextConnect()

middlewares.use(database)

export { middlewares }
