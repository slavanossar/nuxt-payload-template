import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:3001/api/graphql',
  documents: 'graphql/payload/**/*.gql',
  generates: {
    './payload-types.d.ts': {
      plugins: ['typescript', 'typescript-operations'],
    },
    './graphql/payload/exports.d.ts': {
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
