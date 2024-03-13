export function useRelationshipField<Collection>(
  relationshipField: string | Collection | null | undefined,
  collectionHandle: string,
) {
  const doc = ref<Collection | null>(null)

  watchEffect(async () => {
    if (typeof relationshipField === 'string') {
      doc.value = await fetchPayloadDoc<Collection>(
        relationshipField,
        collectionHandle,
      )
    } else if (relationshipField) {
      doc.value = relationshipField
    }
  })

  return doc
}
