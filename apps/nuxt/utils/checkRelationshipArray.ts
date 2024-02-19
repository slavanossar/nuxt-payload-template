export function checkRelationshipArray<Collection>(
  arr: (string | Collection)[],
): Collection[] {
  return arr
    .map((item) => checkRelationship<Collection>(item))
    .filter((item) => item !== null) as Collection[]
}
