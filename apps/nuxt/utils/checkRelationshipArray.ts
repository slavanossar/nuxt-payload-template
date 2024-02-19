export function checkRelationshipArray<Collection>(
  docs: (string | Collection)[],
): Collection[] {
  return docs
    .map((doc) => checkRelationship<Collection>(doc))
    .filter((doc) => doc !== null) as Collection[]
}
