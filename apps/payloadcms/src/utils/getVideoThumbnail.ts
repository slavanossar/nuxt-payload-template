'use server'

import ffmpeg from 'fluent-ffmpeg'
import ffmpegStatic from 'ffmpeg-static'
import { PassThrough, Readable } from 'stream'

import type { PayloadRequest } from 'payload'

type FileUpload = NonNullable<PayloadRequest['file']>

ffmpeg.setFfmpegPath(ffmpegStatic || '')

const getVideoThumbnail = async (file: FileUpload) => {
  return new Promise<FileUpload>(async (resolve, reject) => {
    const buffers: Buffer[] = []
    const passThrough = new PassThrough()

    passThrough.on('data', (chunk) => buffers.push(chunk))
    passThrough.on('error', reject)

    const inputStream = new Readable({
      read() {
        this.push(file.data)
        this.push(null)
      },
    })

    ffmpeg(inputStream)
      .inputFormat('mp4')
      .frames(1)
      .outputFormat('image2')
      .outputOptions(['-q:v 2'])
      .on('error', reject)
      .on('end', () => {
        const buffer = Buffer.concat(buffers)

        resolve({
          data: buffer,
          mimetype: 'image/jpeg',
          name: `${file.name}.jpg`,
          size: buffer.length,
        })
      })
      .pipe(passThrough, { end: true })
  })
}

export default getVideoThumbnail
