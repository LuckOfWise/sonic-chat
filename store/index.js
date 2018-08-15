import Vue from 'vue'
import Vuex from 'vuex'
import firebaseApp from '~/plugins/firebaseApp'

import room from './modules/room'
import user from './modules/user'

Vue.use(Vuex)

const state = {
  user: null,
  sidebar: false,
  db: firebaseApp.firestore()
}

const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  }
}

const createStore = () => {
  return new Vuex.Store({
    state,
    modules: {
      room,
      user
    },
    mutations
  })
}

export default createStore
