import { APIError } from 'payload'

import getVideoThumbnail from '@payload/utils/getVideoThumbnail'
import type { CollectionBeforeOperationHook } from 'payload'

const generateVideoThumbnail: CollectionBeforeOperationHook = async ({
  args,
  req,
}) => {
  if (req.file) {
    const image = await getVideoThumbnail(req.file).catch((error) => {
      throw new APIError(error.message)
    })

    const videoThumbnail = await req.payload.create({
      collection: 'videoThumbnails',
      data: {},
      file: image,
    })

    args.data.thumbnail = videoThumbnail.id
    args.data.adminThumbnailURL = videoThumbnail.sizes?.thumbnail?.url
  }
}

export default generateVideoThumbnail
