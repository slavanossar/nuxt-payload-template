import dotenv from 'dotenv'
import express from 'express'
import payload from 'payload'

dotenv.config()

const { DATABASE_NAME, PAYLOAD_SECRET, PAYLOAD_PUBLIC_PORT } = process.env
const app = express()

payload.init({
  secret: PAYLOAD_SECRET,
  mongoURL: `mongodb://0.0.0.0/${DATABASE_NAME}`,
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

app.listen(PAYLOAD_PUBLIC_PORT)
