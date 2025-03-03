import type { TextField, Validate } from 'payload'

const url: TextField = {
  name: 'url',
  label: 'URL',
  type: 'text',
  validate: ((val) => {
    if (!val) {
      return true
    }

    try {
      const url = new URL(val)
      const hostSegments = url.hostname.split('.')

      return hostSegments.length > 1 &&
        hostSegments.every((segment) => segment.length)
        ? true
        : 'Please enter a valid URL.'
    } catch (_) {
      return 'Please enter a valid URL.'
    }
  }) as Validate,
}
export default url
