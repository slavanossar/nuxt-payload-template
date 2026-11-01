/**
 * Fix for `useId()` divergence during hydration.
 *
 * `@vue/apollo-option` installs a global `serverPrefetch` mixin. Vue treats
 * every component that inherits it as a `useId()` async boundary.
 *
 * Page and layout `<Transition>`s are mounted on the client only, so their
 * `BaseTransition` nodes become extra boundaries during hydration and
 * `useId()` diverges from the server. Queries go through `useAsyncQuery`,
 * which does not use this mixin.
 */
export default defineNuxtPlugin({
  name: 'apollo-use-id',
  enforce: 'post',
  setup(nuxtApp) {
    for (const mixin of nuxtApp.vueApp._context.mixins) {
      const prefetch = mixin.serverPrefetch

      if (typeof prefetch !== 'function') continue
      if (!String(prefetch).includes('$_apolloPromises')) continue

      delete mixin.serverPrefetch
    }
  },
})
