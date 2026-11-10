import type {
  CollectionBeforeChangeHook,
  CollectionConfig,
  CollectionSlug,
  Config,
  Field,
  GlobalBeforeChangeHook,
  GlobalConfig,
  PayloadRequest,
} from 'payload'

export type AuthorshipPluginConfig = {
  /**
   * Collection slugs to leave untouched.
   * Every other collection receives `createdBy` and `updatedBy`.
   */
  excludedCollections?: string[]
  /**
   * Global slugs to leave untouched.
   * Every other global receives `createdBy` and `updatedBy`.
   */
  excludedGlobals?: string[]
}

const relationshipID = (value: unknown) => {
  if (typeof value === 'string' || typeof value === 'number') return value

  if (!value || typeof value !== 'object') return undefined

  if ('id' in value) {
    const id = value.id
    if (typeof id === 'string' || typeof id === 'number') return id
  }

  if ('toHexString' in value && typeof value.toHexString === 'function') {
    return value.toHexString()
  }

  return undefined
}

const userID = (req: PayloadRequest, userCollection: string) => {
  if (!req.user || req.user.collection !== userCollection) return undefined

  return req.user.id
}

const authorshipFields = (relationTo: string): Field[] => [
  {
    type: 'row',
    fields: ['createdBy', 'updatedBy'].map((name) => ({
      name,
      type: 'relationship',
      relationTo: relationTo as CollectionSlug,
      index: true,
      access: {
        create: () => false,
        update: () => false,
      },
      admin: {
        components: {
          Field: '~/plugins/authorship/components/AuthorshipField.tsx',
        },
        readOnly: true,
        allowCreate: false,
        allowEdit: false,
      },
    })),
    admin: {
      position: 'sidebar',
    },
  },
]

const withAuthorshipFields = <T extends CollectionConfig | GlobalConfig>(
  documentConfig: T,
  userCollection: string,
): T => {
  const existingNames = new Set(
    documentConfig.fields.flatMap((field) =>
      'name' in field && field.name ? [field.name] : [],
    ),
  )

  return {
    ...documentConfig,
    fields: [
      ...authorshipFields(userCollection).flatMap<Field>((field) => {
        if (field.type === 'row') {
          const fields = field.fields.filter(
            (child) => !('name' in child) || !existingNames.has(child.name),
          )

          return fields.length ? [{ ...field, fields }] : []
        }

        return 'name' in field && existingNames.has(field.name) ? [] : [field]
      }),
      ...documentConfig.fields,
    ],
  }
}

const trackCollectionAuthorship =
  (userCollection: string): CollectionBeforeChangeHook =>
  ({ data, operation, originalDoc, req }) => {
    if (!data) return data

    const userId = userID(req, userCollection)

    if (operation === 'create') {
      if (!userId) return data

      data.createdBy = userId
      data.updatedBy = userId

      return data
    }

    const createdBy = relationshipID(originalDoc?.createdBy) ?? userId

    if (createdBy) data.createdBy = createdBy
    if (userId) data.updatedBy = userId

    return data
  }

const trackGlobalAuthorship =
  (userCollection: string): GlobalBeforeChangeHook =>
  ({ data, originalDoc, req }) => {
    if (!data) return data

    const userId = userID(req, userCollection)
    const createdBy = relationshipID(originalDoc?.createdBy) ?? userId

    if (createdBy) data.createdBy = createdBy
    if (userId) data.updatedBy = userId

    return data
  }

const assertKnownSlugs = (
  kind: 'collections' | 'globals',
  slugs: string[],
  known: Set<string>,
) => {
  const unknown = slugs.filter((slug) => !known.has(slug))

  if (unknown.length === 0) return

  throw new Error(`authorshipPlugin: unknown ${kind}: ${unknown.join(', ')}`)
}

export const authorshipPlugin =
  (pluginConfig: AuthorshipPluginConfig = {}) =>
  (config: Config): Config => {
    const userCollection = config.admin?.user

    if (!userCollection) {
      throw new Error(
        'authorshipPlugin: config.admin.user must be set so createdBy and updatedBy can relate to it.',
      )
    }

    const excludedCollections = pluginConfig.excludedCollections ?? []
    const excludedGlobals = pluginConfig.excludedGlobals ?? []

    assertKnownSlugs(
      'collections',
      excludedCollections,
      new Set((config.collections ?? []).map(({ slug }) => slug)),
    )
    assertKnownSlugs(
      'globals',
      excludedGlobals,
      new Set((config.globals ?? []).map(({ slug }) => slug)),
    )

    const excludedCollectionSlugs = new Set(excludedCollections)
    const excludedGlobalSlugs = new Set(excludedGlobals)

    return {
      ...config,
      collections: (config.collections ?? []).map((collection) => {
        if (excludedCollectionSlugs.has(collection.slug)) return collection

        return {
          ...withAuthorshipFields(collection, userCollection),
          hooks: {
            ...collection.hooks,
            beforeChange: [
              ...(collection.hooks?.beforeChange ?? []),
              trackCollectionAuthorship(userCollection),
            ],
          },
        }
      }),
      globals: (config.globals ?? []).map((global) => {
        if (excludedGlobalSlugs.has(global.slug)) return global

        return {
          ...withAuthorshipFields(global, userCollection),
          hooks: {
            ...global.hooks,
            beforeChange: [
              ...(global.hooks?.beforeChange ?? []),
              trackGlobalAuthorship(userCollection),
            ],
          },
        }
      }),
    }
  }
