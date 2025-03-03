import { getRelationshipId } from '@payload/utils'
import { CollectionAfterDeleteHook } from 'payload'
import { Video } from 'payload-types'

const deleteVideoThumbnail: CollectionAfterDeleteHook<Video> = async ({
  doc,
  req,
}) => {
  await req.payload.delete({
    id: getRelationshipId(doc.thumbnail),
    collection: 'videoThumbnails',
  })
}

export default deleteVideoThumbnail
