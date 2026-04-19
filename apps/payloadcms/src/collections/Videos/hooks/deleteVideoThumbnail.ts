import { getRelationshipId } from '~/utils'
import { CollectionAfterDeleteHook } from 'payload'
import { Video } from 'payload-types'

const deleteVideoThumbnail: CollectionAfterDeleteHook<Video> = async ({
  doc,
  req,
}) => {
  await req.payload.delete({
    id: getRelationshipId(doc.thumbnail),
    collection: 'video-thumbnails',
  })
}

export default deleteVideoThumbnail
