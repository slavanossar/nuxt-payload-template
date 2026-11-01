import { ready, subscribe, unsubscribe } from '@payloadcms/live-preview'

export const useLivePreview = <T extends Record<string, any>>(props: {
  depth?: number
  initialData: MaybeRef<T>
}): {
  data: Ref<T>
  isLoading: Ref<boolean>
} => {
  const route = useRoute()
  const runtimeConfig = useRuntimeConfig()
  const serverURL = runtimeConfig.public.siteUrl
  const apiRoute = runtimeConfig.public.payloadApiRoute

  const { depth = 0, initialData } = props
  const data = ref(unref(initialData)) as Ref<T>
  const isLoading = ref(true)
  const hasSentReadyMessage = ref(false)

  let subscription: ((event: MessageEvent) => Promise<void> | void) | undefined

  const onChange = (mergedData: T) => {
    data.value = mergedData
    isLoading.value = false
  }

  onMounted(() => {
    if (!route.query.preview) {
      isLoading.value = false
      return
    }

    subscription = subscribe({
      apiRoute,
      callback: onChange,
      depth,
      initialData: unref(initialData),
      serverURL,
    })

    if (!hasSentReadyMessage.value) {
      hasSentReadyMessage.value = true

      ready({ serverURL })
    }
  })

  onUnmounted(() => {
    if (subscription) unsubscribe(subscription)
  })

  return { data, isLoading }
}
