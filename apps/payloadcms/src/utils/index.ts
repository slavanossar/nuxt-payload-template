import {
  lexicalEditor,
  BoldFeature,
  ItalicFeature,
  ParagraphFeature,
  LinkFeature,
} from '@payloadcms/richtext-lexical'
import type { FeatureProviderServer } from '@payloadcms/richtext-lexical'

/**
 * Helpers
 */
export const getRelationshipID = <T extends { id: string }>(
  field: string | T,
) => {
  return typeof field === 'string' ? field : field.id
}

/**
 * Live Preview
 */
export const livePreviewBreakpoints = [
  {
    name: 'mobile',
    label: 'Mobile',
    width: 375,
    height: 667,
  },
  {
    name: 'tabletPortrait',
    label: 'Tablet (Portrait)',
    width: 768,
    height: 1024,
  },
  {
    name: 'tabletLandscape',
    label: 'Tablet (Landscape)',
    width: 1024,
    height: 768,
  },
  {
    name: 'desktop',
    label: 'Desktop',
    width: 1280,
    height: 800,
  },
  {
    name: 'desktopWide',
    label: 'Desktop (Wide)',
    width: 1536,
    height: 960,
  },
]

/**
 * Rich Text
 */
// TODO: Add FixedToolbarFeature after upgrading to Payload V3
export const createBaseLexicalEditor = (features: FeatureProviderServer[] = []) => {
  return lexicalEditor({
    features: [
      BoldFeature(),
      ItalicFeature(),
      ParagraphFeature(),
      LinkFeature({}),
      ...features,
    ],
  })
}
