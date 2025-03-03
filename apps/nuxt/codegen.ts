import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: `${process.env.NEXT_PUBLIC_SITE_URL}${process.env.NEXT_PUBLIC_PAYLOAD_API_ROUTE}/graphql`,
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
