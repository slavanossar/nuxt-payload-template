import { breakpointsTailwind } from '@vueuse/core'

export default () =>
  useBreakpoints({
    ...breakpointsTailwind,
    '2xl': 1440,
    '3xl': 1536,
  })
