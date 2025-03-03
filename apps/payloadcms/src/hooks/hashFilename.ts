import crypto from 'crypto'

import type { CollectionBeforeOperationHook } from 'payload'

const hashFilename: CollectionBeforeOperationHook = ({ args, req }) => {
  if (req.file && !args.where) {
    const filename = req.file.name ?? ''
    const extension = filename.split('.').at(-1) ?? ''
    args.data.title = filename

    const hash = crypto
      .createHash('md5')
      .update([filename, Date.now()].join(''))
      .digest('hex')

    req.file.name = [hash, extension].join('.')
  }
}

export default hashFilename
