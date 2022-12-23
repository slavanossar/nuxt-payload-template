import { writeFileSync } from 'fs'
import fetch from 'node-fetch'
import payload from 'payload'

console.log('Generating GraphQL possibleTypes...')

fetch(`${payload.getAPIURL()}/graphql`, {
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
})
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
