export default async function ({ store, redirect, route }) {
  if(route.name != 'index' && !store.state.currentUser) {
    redirect('/')
  }
}
