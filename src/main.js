import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import theme from './theme'
import { store } from './store'
import DateFilter from './filters/date'

Vue.use(Vuetify, {theme})

Vue.config.productionTip = false

Vue.filter('date', DateFilter)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyD25gymalL3BRRXrG_zid0Iq4iqfP6XrbM',
      authDomain: 'meetup-d696c.firebaseapp.com',
      databaseURL: 'https://meetup-d696c.firebaseio.com',
      projectId: 'meetup-d696c',
      storageBucket: 'meetup-d696c.appspot.com'
    })
  }
})