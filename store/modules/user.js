import firebaseApp from '~/plugins/firebaseApp'

const state = {
  user: null
}

const getters = {
  currentUser (state) {
    return state.user
  }
}

const mutations = {
  SET_USER (state, {user}) {
    state.user = user
  }
}

const actions = {
  signIn ({commit}, payload) {
    const auth = firebaseApp.auth()
    auth.signInAnonymously()
    auth.onAuthStateChanged((user) => {
      commit('SET_USER', {user})
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
