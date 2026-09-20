export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html) => {
    html.head.push(
      '<script src="https://dpdp-prod.vercel.app/sdk/v1/s.js" data-org="d94c503e-f36d-48bb-b34b-8fc1413cdccb" async></script>',
    )
  })
})
