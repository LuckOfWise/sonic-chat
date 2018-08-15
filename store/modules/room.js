const state = {
  users: {},
  messages: []
}

const getters = {
  users (state) {
    return state.users
  }
}

const mutations = {
  SET_USERS (state, {users}) {
    state.users = users
  }
}

const actions = {
  sendMessage ({commit, rootState}, payload) {
    let roomId = payload.roomId
    const message = {
      userId: payload.userId,
      content: payload.content,
      createdAt: Date.now()
    }
    rootState.db.collection(`rooms/${roomId}/messages`).add(message)
      .then(
        (data) => {
          console.log(data)
        }
      )
      .catch(
        (error) => {
          console.log(error)
        }
      )
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
