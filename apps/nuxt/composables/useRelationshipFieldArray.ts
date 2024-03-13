export function useRelationshipFieldArray<Collection>(
  relationshipFieldArray: (string | Collection)[] | null | undefined,
  collectionHandle: string,
) {
  const docs = ref<Collection[]>([]) as Ref<Collection[]>

  watchEffect(async () => {
    if (relationshipFieldArray) {
      const res = await Promise.all(
        relationshipFieldArray.map((item) =>
          useRelationshipField(item, collectionHandle),
        ),
      )

      const filtered = res
        .map((item) => unref(item))
        .filter((item): item is Collection => item !== undefined)

      docs.value = filtered
    }
  })

  return docs
}
