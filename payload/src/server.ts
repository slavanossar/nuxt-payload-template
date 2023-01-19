import cors from 'cors'
import express from 'express'
import payload from 'payload'

require('dotenv').config()

const app = express()
app.use(
  cors({
    origin:
      process.env.NODE_ENV !== 'production' ? '*' : process.env.SERVER_URL,
  }),
)

payload.initAsync({
  secret: process.env.PAYLOAD_SECRET,
  mongoURL: process.env.MONGODB_URI,
  express: app,
  onInit: () => {
    payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
  },
})

app.use('*', (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  } else {
    next()
  }
})

app.listen(3001)
