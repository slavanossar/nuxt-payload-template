import { breakpointsTailwind } from '@vueuse/core'

export const tailwindBreakpoints = {
  ...breakpointsTailwind,
  '2xl': 1440,
  '3xl': 1536,
} as const
