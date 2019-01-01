import { vuexblazePlugin, collection } from 'vuexblaze'
export const plugins = [vuexblazePlugin]

export const state = () => ({
  webhook: null,
  webhooks: []
})

export const mutations = {
}

export const actions = {
  ...collection('webhooks').bind(),
  ...collection('webhooks').doc().bindTo('webhook'),
  ...collection('webhooks').crud()
}
export const strict = false
