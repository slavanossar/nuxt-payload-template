import { writeFileSync } from 'fs'
import fetch from 'node-fetch'
import { config } from 'dotenv'

config()

console.log('Generating GraphQL possibleTypes...')

fetch(
  `http://localhost:${process.env.PAYLOAD_PUBLIC_PORT}${process.env.PAYLOAD_PUBLIC_API_ROUTE}/graphql`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      variables: {},
      query: `{
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }`,
    }),
  },
)
  .then((res) => {
    return res.json()
  })
  .then(({ data }) => {
    const possibleTypes = data.__schema.types.reduce(
      (acc, { name, possibleTypes }) => {
        if (possibleTypes) {
          acc[name] = possibleTypes.map((subtype) => subtype.name)
        }

        return acc
      },
      {},
    )

    try {
      writeFileSync(
        './graphql/possibleTypes.json',
        JSON.stringify(possibleTypes),
      )
      console.log('GraphQL possibleTypes generated.')
    } catch (err) {
      console.error(err)
    }
  })
  .catch((err) => {
    console.error(err)
  })
