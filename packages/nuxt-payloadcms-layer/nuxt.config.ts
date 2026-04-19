import { resolve } from "path";

const { NEXT_PUBLIC_PAYLOAD_API_ROUTE } = process.env;

export default defineNuxtConfig({
  modules: ["@nuxtjs/seo"],
  alias: {
    "#payload-config": resolve(
      __dirname,
      "../../apps/payloadcms/src/payload.config.ts",
    ),
    "#payload-types": resolve(
      __dirname,
      "../../apps/payloadcms/payload-types.d.ts",
    ),
  },
  runtimeConfig: {
    public: {
      payloadApiRoute: NEXT_PUBLIC_PAYLOAD_API_ROUTE,
    },
  },
});
