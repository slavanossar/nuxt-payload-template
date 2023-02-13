import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:3001/_payload/graphql',
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
