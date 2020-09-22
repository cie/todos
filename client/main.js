import '../imports/api'
import App from '../imports/ui/App'
import 'svelte/internal'
Meteor.startup(() => {
  new App({
    target: document.getElementById('app')
  })
})
