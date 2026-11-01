/**
 * Join a Payload API path onto a base URL.
 * `base` is either the public site origin or the internal service binding.
 */
export function payloadEndpoint(base: string, apiRoute: string, path = '') {
  const route = apiRoute.startsWith('/') ? apiRoute : `/${apiRoute}`
  const root = new URL(route, base.endsWith('/') ? base : `${base}/`)

  if (!path) return root.href

  const suffix = path.replace(/^\/+/, '')
  const rootHref = root.href.endsWith('/') ? root.href : `${root.href}/`

  return new URL(suffix, rootHref).href
}
