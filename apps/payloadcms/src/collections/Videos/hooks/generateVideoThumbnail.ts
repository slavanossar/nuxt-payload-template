import { APIError } from 'payload'

import getVideoThumbnail from '~/utils/getVideoThumbnail'
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
      collection: 'video-thumbnails',
      data: {},
      file: image,
    })

    // @ts-expect-error - type mismatch
    args.data.thumbnail = videoThumbnail.id
    // @ts-expect-error - type mismatch
    args.data.adminThumbnailURL = videoThumbnail.sizes?.thumbnail?.url
  }
}

export default generateVideoThumbnail
