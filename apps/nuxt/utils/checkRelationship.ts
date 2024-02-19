export function checkRelationship<Collection>(
  doc: string | Collection,
): Collection | null {
  return doc && typeof doc !== 'string' ? doc : null
}
