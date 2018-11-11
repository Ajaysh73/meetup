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
      user: null
  },
  mutations: {
    createMeetup (state, payload) {
      console.log('in mutaions')
      state.loadedMeetups.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    createMeetup ({commit}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        id: '9ikadu898009'
      }
      console.log('Just before commit, in action', '')
      commit('createMeetup', meetup)
    },
    signUserUp ({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          const newUser = {
            id: user.uid,
            registeredMeetups: []
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          console.log(error)
        })
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
      }
    }
  })
