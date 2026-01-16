/**
 * Enums
 */
export const IMAGE_SIZES = {
  xs: 320,
  sm: 640,
  md: 960,
  lg: 1200,
  xl: 1600,
  xxl: 2000,
  xxxl: 2400,
} as const

/**
 * Utils
 */
export const getRelationshipId = <T extends { id: string }>(
  field: string | T,
) => (typeof field === 'string' ? field : field.id)
