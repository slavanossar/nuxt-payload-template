import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: `http://localhost:${process.env.PAYLOAD_PUBLIC_PORT}${process.env.PAYLOAD_PUBLIC_API_ROUTE}/graphql`,
  documents: 'graphql/**/*.gql',
  generates: {
    './graphql/exports.d.ts': {
      plugins: ['typescript-vue-apollo'],
      config: {
        withCompositionFunctions: false,
      },
    },
  },
  config: {
    skipDocumentsValidation: true,
  },
}

export default config
