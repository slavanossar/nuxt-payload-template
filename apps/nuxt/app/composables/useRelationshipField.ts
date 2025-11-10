type Single<T> = MaybeRef<string | T | null | undefined>
type Many<T> = MaybeRef<(string | T)[] | null | undefined>

export function useRelationshipField<T>(field: Single<T>): Ref<T | null>

export function useRelationshipField<T>(field: Many<T>): Ref<T[]>

export function useRelationshipField<T extends PayloadCollection>(
  field: Single<T> | Many<T>,
): Ref<T | null> | Ref<T[]> {
  const initialValue = unref(field)
  const isArrayField = Array.isArray(initialValue)

  if (isArrayField) {
    const docs = ref<T[]>([]) as Ref<T[]>

    watchEffect(() => {
      const fieldUnref = unref(field) as (string | T)[] | null | undefined

      if (fieldUnref) {
        docs.value = fieldUnref.filter(
          (item): item is T => typeof item !== 'string',
        )
      } else {
        docs.value = []
      }
    })

    return docs
  } else {
    const doc = ref<T | null>(null) as Ref<T | null>

    watchEffect(() => {
      const fieldUnref = unref(field) as string | T | null | undefined

      if (fieldUnref && typeof fieldUnref !== 'string') {
        doc.value = fieldUnref
      } else {
        doc.value = null
      }
    })

    return doc
  }
}
