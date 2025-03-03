import type { Config } from 'payload-types'

type CollectionSlugs = keyof Config['collections']

const fetchDocument = <K extends CollectionSlugs>(
  collection: K,
  id: string,
) => {
  return fetch(
    [process.env.NEXT_PUBLIC_PAYLOAD_API_ROUTE, collection, id].join('/'),
  )
    .then((res) => res.json())
    .then((doc: Config['collections'][K]) => doc)
}

export default fetchDocument
