export function checkRelationship<Collection>(
  obj: string | Collection,
): Collection | null {
  return obj && typeof obj !== 'string' ? obj : null
}
