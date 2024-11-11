export default defineEventHandler(async (event) => {
  const template = getRouterParam(event, 'template')
  const payloadLocalApi = await usePayloadLocalApi()

  const { docs } = await payloadLocalApi.find({
    collection: 'pages',
    where: {
      template: { equals: template },
    },
  })

  return docs.length ? docs[0] : null
})
