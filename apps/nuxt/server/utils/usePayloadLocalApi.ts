import { getPayload } from 'payload'
import config from '#payload/src/payload.config.js'

export default function () {
  return getPayload({ config })
}
