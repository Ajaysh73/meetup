/* eslint-disable spaced-comment */
/* eslint-disable indent */
import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl: require('@/assets/Delhi.jpg'),
        id: 'uoiqw7d8912khelk',
        title: 'Meetup in New Delhi',
        location: 'New Delhi',
        description: 'This is fun filled meetup. You guys goona have fun',
        date: new Date()
      },
      {
        imageUrl: require('@/assets/Tokyo.jpg'),
        id: 'kjhkjhd898790009',
        title: 'Meetup in Japan',
        location: 'Tokyo',
        description:
          'This is another fun filled meetup in Tokyo. You guys gonna have fun',
        date: new Date()
      }
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    registerUserForMeetup (state, payload) {
      const id = payload.id
      if (
        state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >= 0
      ) {
        console.log('Already registered')
        return
      }
      console.log('id is' + id)
      state.user.registeredMeetups.push(id)
      state.user.fbKeys[id] = payload.fbKey
      console.log('Pushed succesfully')
      console.log(state.user)
      console.log(JSON.stringify(state.user))
      console.log('----')
      console.log(JSON.stringify(state.user.registeredMeetups))
    },
    unregisterUserFromMeetup (state, payload) {
      const registeredMeetups = state.user.registeredMeetups
      registeredMeetups.splice(
        registeredMeetups.findIndex(meetupId => meetupId === payload),
        1
      )
      Reflect.deleteProperty(state.user.fbKeys, payload)
      console.log('deleted fbkeys from user in mutations')
      console.log(state.user)
      console.log(JSON.stringify(registeredMeetups))
    },
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      console.log('in mutaions')
      state.loadedMeetups.push(payload)
    },
    updateMeetup (state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id
      })
      if (payload.title) {
        meetup.title = payload.title
      }
      if (payload.description) {
        meetup.description = payload.description
      }
      if (payload.date) {
        meetup.date = payload.date
      }
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    registerUserForMeetup ({ commit, getters }, payload) {
      commit('setLoading', true)
      const user = getters.user
      firebase
        .database()
        .ref('/users/' + user.id)
        .child('/registrations/')
        .push(payload)
        .then(data => {
          commit('setLoading', false)
          console.log(
            'Succeded in RegisterUserForMeetup in Actions before commit' + data
          )
          commit('registerUserForMeetup', { id: payload, fbKey: data.key })
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    unregisterUserFromMeetup ({ commit, getters }, payload) {
      commit('setLoading', true)
      const user = getters.user
      if (!user.fbKeys) {
        console.log('User doesn\'t have fbkeys prop')
        return
      }
      const fbKey = user.fbKeys[payload]
      firebase
        .database()
        .ref('/users/' + user.id + '/registrations/')
        .child(fbKey)
        .remove()
        .then(() => {
          commit('setLoading', false)
          commit('unregisterUserFromMeetup', payload)
        })
        .catch(error => {
          console.log(error)
          console.log('In error in Action UNregisterUserForMeetup')
          commit('setLoading', false)
        })
    },
    loadMeetups ({ commit }) {
      commit('setLoading', true)
      firebase
        .database()
        .ref('meetups')
        .once('value')
        .then(data => {
          const meetups = []
          const obj = data.val()
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              creatorId: obj[key].creatorId
            })
          }
          commit('setLoadedMeetups', meetups)
          commit('setLoading', false)
        })
        .catch(error => {
          commit('setLoading', false)
          console.log(error)
        })
    },
    createMeetup ({ commit, getters }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      let key
      let imageUrl
      firebase
        .database()
        .ref('meetups')
        .push(meetup)
        .then(data => {
          key = data.key
          return key
        })
        .then(key => {
          // also in my payload object i stored an image file
          //so here i am uploading the image to the firebase storage
          const fileName = payload.image.name
          const extension = fileName.slice(fileName.lastIndexOf('.'))
          return firebase
            .storage()
            .ref('meetup/' + key + '.' + extension)
            .put(payload.image)
        })
        .then(uploadTaskSnapshot => {
          return uploadTaskSnapshot.ref.getDownloadURL()
        })
        .then(imageUrl => {
          console.log(imageUrl)
          console.log(key)
          return firebase
            .database()
            .ref('meetups')
            .child(key)
            .update({ imageUrl: imageUrl })
        })
        .then(() => {
          commit('createMeetup', {
            ...meetup,
            imageUrl: imageUrl,
            id: key
          })
        })
        .catch(error => {
          console.log(error)
        })
      // Reach out to firebase and store it
    },
    updateMeetupData ({ commit }, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.date) {
        updateObj.date = payload.date
      }
      firebase
        .database()
        .ref('meetups')
        .child(payload.id)
        .update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateMeetup', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    signUserUp ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      setTimeout(5000)
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setLoading', false)
          const newUser = { id: user.uid, registeredMeetups: [], fbKeys: {} }
          commit('setUser', newUser)
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    },
    signUserIn ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      setTimeout(5000)
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setLoading', false)
          const newUser = { id: user.uid, registeredMeetups: [], fbKeys: {} }
          commit('setUser', newUser)
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    },
    clearError ({ commit }) {
      commit('clearError')
    },
    autoSignIn ({ commit }, payload) {
      commit('setUser', { id: payload.uid, registeredMeetups: [], fbKeys: {} })
    },
    fetchUserData ({commit, getters}) {
      commit('setLoading', true)
      console.log(getters.user.id)
      firebase.database().ref('/users/' + getters.user.id + '/registrations/').once('value')
      .then(data => {
        const dataPairs = data.val()
        let registeredMeetups = []
        let swappedPairs = {}
        for (let key in dataPairs) {
          registeredMeetups.push(dataPairs[key])
            swappedPairs[dataPairs[key]] = key
        }
        const updatedUser = {
          id: getters.user.id,
          registeredMeetups: registeredMeetups,
          fbKeys: swappedPairs
        }
        commit('setLoading', false)
        commit('setUser', updatedUser)
      })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    logout ({ commit }) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return meetupId => {
        return state.loadedMeetups.find(meetup => {
          return meetup.id === meetupId
        })
      }
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
