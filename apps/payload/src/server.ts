import dotenv from 'dotenv'
import express from 'express'
import payload from 'payload'

dotenv.config()

const app = express()

payload.init({
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

app.listen(process.env.PAYLOAD_PUBLIC_PORT)
