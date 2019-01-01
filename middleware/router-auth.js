export default async function ({ store, redirect, route }) {
  console.log(route.name)
  if(route.name == 'forms-form-form'){
    return
  }

  if(route.name != 'index' && !store.state.currentUser) {
    redirect('/')
  }
}
