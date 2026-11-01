import { withPayload } from '@payloadcms/next/withPayload'

const siteHostname = (() => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  if (!siteUrl) return

  try {
    return new URL(siteUrl).hostname
  } catch {
    return
  }
})()

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Admin is opened through nginx on the public site host, not localhost.
  allowedDevOrigins: siteHostname ? [siteHostname] : [],
}

export default withPayload(nextConfig)
