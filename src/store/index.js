/* eslint-disable indent */
import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
        {imageUrl: require('@/assets/Delhi.jpg'),
        id: 'uoiqw7d8912khelk',
        title: 'Meetup in New Delhi',
        location: 'New Delhi',
        description: 'This is fun filled meetup. You guys goona have fun',
        date: new Date()
      },
        {imageUrl: require('@/assets/Tokyo.jpg'),
        id: 'kjhkjhd898790009',
        title: 'Meetup in Japan',
        location: 'Tokyo',
        description: 'This is another fun filled meetup in Tokyo. You guys gonna have fun',
        date: new Date()
      }
      ],
      user: null,
      loading: false,
      error: null
  },
  mutations: {
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      console.log('in mutaions')
      state.loadedMeetups.push(payload)
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
    loadedMeetups ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
      .then((data) => {
        const meetups = []
        const obj = data.val()
        for (let key in obj) {
          meetups.push({
          id: key,
          title: obj[key].title,
          description: obj[key].description,
          imageUrl: obj[key].imageUrl,
          date: obj[key].date
        })
      }
      commit('setLoadedMeetups', meetups)
      commit('setLoading', false)
      })
      .catch((error) => {
        commit('setLoading', false)
        console.log(error)
      })
    },
    createMeetup ({commit}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date.toISOString()
      }
      firebase.database().ref('meetups').push(meetup)
      .then((data) => {
        const key = data.key
        commit('createMeetup', {
          ...meetup,
          id: key})
      })
      .catch((error) => {
        console.log(error)
      })
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      setTimeout(5000)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      setTimeout(5000)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
      commit('setLoading', false)
          const newUser = {
            id: user.uid,
            registeredMeetups: []
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
      },
      clearError ({commit}) {
        commit('clearError')
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
        return (meetupId) => {
          return state.loadedMeetups.find((meetup) => {
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
