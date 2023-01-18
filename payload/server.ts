import cors from 'cors'
import express from 'express'
import payload from 'payload'

require('dotenv').config()

const isDev = process.env.NODE_ENV !== 'production'
const port = process.env.PAYLOAD_PUBLIC_PORT || 3001

const app = express()
app.use(
  cors({
    origin: isDev ? '*' : process.env.SERVER_URL,
  }),
)

payload.initAsync({
  secret: process.env.PAYLOAD_SECRET_KEY,
  mongoURL: process.env.MONGODB_URL,
  express: app,
  onInit: () => {
    payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
  },
})

app.use('*', (req, res) => {
  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }
})

app.listen(port, '0.0.0.0')
