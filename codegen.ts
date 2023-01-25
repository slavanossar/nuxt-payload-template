import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:3001/api/graphql',
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
