export function useRelationshipField<Collection>(
  relationshipField: string | Collection | null | undefined,
) {
  const doc = ref<Collection | null>(null) as Ref<Collection | null>

  watchEffect(() => {
    if (relationshipField && typeof relationshipField !== 'string') {
      doc.value = relationshipField
    }
  })

  return doc
}
