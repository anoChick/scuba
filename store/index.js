import { vuexblazePlugin, collection } from 'vuexblaze'
import firebase from 'firebase'
export const plugins = [vuexblazePlugin]

export const state = () => ({
  currentUser: null,
  webhook: null,
  webhooks: [],
  form: null,
  forms: []
})

export const mutations = {
  currentUser(state, user) {
    state.currentUser = user
  }
}

export const actions = {
  setUser(context, user) {
    context.commit('currentUser', user);
  },
  ...collection('webhooks').bind(),
  ...collection('webhooks').doc().bindTo('webhook'),
  ...collection('webhooks').crud(),
  ...collection('forms').bind(),
  ...collection('forms').doc().bindTo('form'),
  ...collection('forms').crud()
}
export const strict = false
