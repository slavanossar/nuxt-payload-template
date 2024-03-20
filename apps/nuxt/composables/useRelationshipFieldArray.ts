export function useRelationshipFieldArray<Collection>(
  relationshipFieldArray: (string | Collection)[] | null | undefined,
) {
  const docs = ref<Collection[]>([]) as Ref<Collection[]>

  watchEffect(() => {
    if (relationshipFieldArray) {
      docs.value = relationshipFieldArray.filter(
        (item): item is Collection => typeof item !== 'string',
      )
    }
  })

  return docs
}
