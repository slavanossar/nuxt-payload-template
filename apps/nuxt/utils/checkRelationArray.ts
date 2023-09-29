export function checkRelationArray<Collection>(
  arr: (string | Collection)[],
): Collection[] {
  return arr
    .map((item) => checkRelation<Collection>(item))
    .filter((item) => item !== null) as Collection[]
}
