import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: '../payloadcms/schema.graphql',
  documents: 'graphql/**/*.gql',
  generates: {
    './graphql/exports.ts': {
      plugins: ['typescript-operations', 'typed-document-node'],
      config: {
        useTypeImports: true,
        maybeValue: 'T',
        scalars: {
          DateTime: 'string',
        },
      },
    },
  },
}

export default config
