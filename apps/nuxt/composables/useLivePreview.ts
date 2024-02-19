import { subscribe, unsubscribe, ready } from '@payloadcms/live-preview'

export const useLivePreview = <T>(props: {
  depth?: number
  initialData: MaybeRef<T>
}): {
  data: Ref<T>
  isLoading: Ref<boolean>
} => {
  const runtimeConfig = useRuntimeConfig()
  const serverURL = runtimeConfig.public.siteUrl
  const apiRoute = runtimeConfig.public.payloadApiRoute

  const { depth = 0, initialData } = props
  const data = ref(unref(initialData)) as Ref<T>
  const isLoading = ref(true)
  const hasSentReadyMessage = ref(false)

  const onChange = (mergedData: T) => {
    data.value = mergedData
    isLoading.value = false
  }

  onMounted(() => {
    const subscription = subscribe({
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

    onUnmounted(() => {
      unsubscribe(subscription)
    })
  })

  return { data, isLoading }
}
