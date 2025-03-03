import { getPayload } from 'payload'
import config from '@payload-config'

import type { File } from 'payload'

const regenerateImageSizes = async (): Promise<void> => {
  const payload = await getPayload({ config })

  const image = await payload.find({
    collection: 'images',
    depth: 0,
    limit: 999,
  })

  if (image !== null && image.totalDocs > 0) {
    payload.logger.info(`Found ${image.totalDocs} image files.`)

    for (let index = 0; index < image.docs.length; index++) {
      const imageDoc = image.docs[index]

      try {
        await fetch(imageDoc.url!)
          .then(async (response) => await response.blob())
          .then(async (blob) => {
            const arrayBuffer = await blob.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer)

            const file: File = {
              data: buffer,
              mimetype: blob.type,
              name: imageDoc.filename!,
              size: imageDoc.filesize!,
            }

            await payload.update({
              collection: 'images',
              id: imageDoc.id,
              data: imageDoc,
              file,
              overwriteExistingFiles: true,
            })

            payload.logger.info(
              `Image ${imageDoc.id} (${imageDoc.filename}) regenerated successfully`,
            )
          })
      } catch (err) {
        payload.logger.error(
          `Image ${imageDoc.id} (${imageDoc.filename}) failed to regenerate`,
        )
        console.error(err)
      }
    }
  } else {
    payload.logger.info('No image files found.')
  }

  payload.logger.info('Done!')
  process.exit(0)
}

void regenerateImageSizes()
