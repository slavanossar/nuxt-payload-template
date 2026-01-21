// Generic block type that works with any Payload block
// Blocks have a blockType field that identifies the block type
export type PayloadBlockProps = {
  block: {
    id?: string | null
    blockName?: string | null
    blockType: string
  }
}
