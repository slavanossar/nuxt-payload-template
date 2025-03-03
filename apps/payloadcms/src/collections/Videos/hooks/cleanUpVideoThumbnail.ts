import { getRelationshipId } from '@payload/utils'
import { CollectionAfterChangeHook } from 'payload'
import { Video } from 'payload-types'

const cleanUpVideoThumbnails: CollectionAfterChangeHook<Video> = async ({
  doc,
  operation,
  previousDoc,
  req,
}) => {
  if (operation === 'update') {
    const thumbnailId = getRelationshipId(doc.thumbnail)
    const previousThumbnailId = getRelationshipId(previousDoc.thumbnail)

    if (thumbnailId !== previousThumbnailId) {
      await req.payload.delete({
        id: previousThumbnailId,
        collection: 'videoThumbnails',
      })
    }
  }
}

export default cleanUpVideoThumbnails
