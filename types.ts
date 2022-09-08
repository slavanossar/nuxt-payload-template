export interface PayloadImageProps {
  // eslint-disable-next-line vue/prop-name-casing
  __typename: string
  cover?: boolean
  description?: string
  id: string
  sizes?: string
  transforms: {
    [key: string]: {
      url: string
      width: number
    }
  }
  url: string
  width: number
}
