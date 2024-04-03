export function useRelationshipField<Collection>(
  field: MaybeRef<string | Collection | null | undefined>,
) {
  const doc = ref<Collection | null>(null) as Ref<Collection | null>

  watchEffect(() => {
    const fieldUnref = unref(field)

    if (fieldUnref && typeof fieldUnref !== 'string') {
      doc.value = fieldUnref
    }
  })

  return doc
}
