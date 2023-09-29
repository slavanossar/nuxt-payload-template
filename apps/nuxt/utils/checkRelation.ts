export function checkRelation<Collection>(obj: any): Collection | null {
  return obj && typeof obj !== 'string' ? obj : null
}
