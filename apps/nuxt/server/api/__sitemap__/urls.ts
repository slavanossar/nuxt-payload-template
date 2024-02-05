// import type { Entry } from '#payload/types'

// interface Entries {
//   docs: Entry[]
// }

// export default defineSitemapEventHandler(async () => {
//   const runtimeConfig = useRuntimeConfig()
//   const payloadApiUrl = `${runtimeConfig.public.siteUrl}/_payload`

//   const entry = await $fetch<Entries>(`${payloadApiUrl}/entries`).then(
//     ({ docs }) => {
//       return docs
//         .filter(({ _status }) => _status === 'published')
//         .map(({ slug, updatedAt }) =>
//           asSitemapUrl({
//             loc: `/${slug}`,
//             lastmod: updatedAt,
//           }),
//         )
//     },
//   )

//   return []
// })
