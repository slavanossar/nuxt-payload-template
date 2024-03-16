export function getRelationshipID<T extends { id: string }>(
  idOrDoc: string | T,
) {
  return typeof idOrDoc === 'string' ? idOrDoc : idOrDoc.id
}
