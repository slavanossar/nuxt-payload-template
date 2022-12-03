import { CodegenConfig } from '@graphql-codegen/cli'

const { SERVER_URL } = process.env

const config: CodegenConfig = {
  schema: `${SERVER_URL}/api/graphql`,
  documents: 'graphql/**/*.gql',
  generates: {
    './payload-types.d.ts': {
      plugins: ['typescript', 'typescript-operations'],
    },
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
