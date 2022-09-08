const fs = require('fs')
const cors = require('cors')
const express = require('express')
const payload = require('payload')
require('dotenv').config()

const isDev = process.env.NODE_ENV !== 'production'
const port = process.env.PAYLOAD_PUBLIC_PORT || 3001

const app = express()
app.use(
  cors({
    origin: isDev ? '*' : process.env.SERVER_URL,
  }),
)

function generatePossibleTypes() {
  payload.logger.info('Performing GraphQL schema introspection...')

  return fetch(`${payload.getAPIURL()}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      variables: {},
      query: `
        {
          __schema {
            types {
              kind
              name
              possibleTypes {
                name
              }
            }
          }
        }
      `,
    }),
  })
    .then((result) => result.json())
    .then(({ data }) => {
      const possibleTypes = {}

      data.__schema.types.forEach((supertype) => {
        if (supertype.possibleTypes) {
          possibleTypes[supertype.name] = supertype.possibleTypes.map(
            (subtype) => subtype.name,
          )
        }
      })

      try {
        fs.writeFileSync('./possibleTypes.json', JSON.stringify(possibleTypes))
        payload.logger.info('GraphQL possibleTypes generated.')
      } catch (err) {
        payload.logger.error(err)
      }
    })
    .catch((err) => {
      payload.logger.error(err)
    })
}

payload.init({
  secret: process.env.PAYLOAD_SECRET_KEY,
  mongoURL: process.env.MONGODB_URL,
  express: app,
  onInit: async () => {
    payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    await generatePossibleTypes()
  },
})

app.use('*', (req, res) => {
  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }
})

app.listen(port, '0.0.0.0')
