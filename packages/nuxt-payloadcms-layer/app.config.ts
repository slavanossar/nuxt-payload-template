export default defineAppConfig({
  nuxtPayloadCmsLayer: {
    name: "Hello from Nuxt layer",
  },
});

declare module "@nuxt/schema" {
  interface AppConfigInput {
    nuxtPayloadCmsLayer?: {
      /** Project name */
      name?: string;
    };
  }
}
