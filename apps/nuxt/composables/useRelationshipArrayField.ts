export function useRelationshipArrayField<Collection>(
  field: MaybeRef<(string | Collection)[] | null | undefined>,
) {
  const docs = ref<Collection[]>([]) as Ref<Collection[]>

  watchEffect(() => {
    const fieldUnref = unref(field)

    if (fieldUnref) {
      docs.value = fieldUnref.filter(
        (item): item is Collection => typeof item !== 'string',
      )
    }
  })

  return docs
}
