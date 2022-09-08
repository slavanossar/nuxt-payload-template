import { vScroll } from '@/directives'

export default defineNuxtPlugin(({ vueApp: { directive } }) => {
  directive('scroll', vScroll())
})
