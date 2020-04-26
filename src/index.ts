import { RequestHandler, send } from 'micro'
import { get, post, router } from 'microrouter'

import { indexObjectPost } from './routes/objects/post'
import { indexObjectGetAll, indexObjectGet } from './routes/objects/get'

const service: RequestHandler = (_, res) => {
  send(res, 200, {
    status: 'ok',
    data: {
      message: 'Welcome to G '
    }
  })
}

module.exports = router(
  get('/', service),
  post('/objects', indexObjectPost),
  get('/objects', indexObjectGetAll),
  get('/objects/:objectUuid', indexObjectGet),
)
