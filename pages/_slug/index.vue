<template lang="pug">
  v-layout.row
    v-flex.xs-12.sm-8
      .chat__container(v-on:scroll='onScroll', ref='chatContainer')
        message(:messages='messages')
      .chat__form
        textarea(v-on:keydown='sendMessage($event)', v-model='content', placeholder='Ctrl+Enterで送信')
    v-dialog(v-model='showUserForm' max-width='500px' persistent=true)
      v-card
        v-card-title
          span.headline User Profile
        v-card-text
          v-text-field(label='Name' v-model='userName')
        v-card-actions
          v-spacer
          v-btn(color='blue darken-1' @click.native='saveUserName' flat) Save
          
</template>

<script>
import Message from '@/components/Message.vue'
export default {
  layout: 'room',
  data () {
    return {
      roomId: '',
      content: '',
      userName: '',
      roomUsers: {},
      roomMessages: [],
      initialized: false,
      loading: false,
      totalChatHeight: 0,
      unsubscribe: null,
      dialog: true
    }
  },
  mounted () {
    this.roomId = this.$route.params.slug
    this.loadRoom()
  },
  components: {
    'message': Message
  },
  computed: {
    messages () {
      return this.roomMessages
    },
    currentUser () {
      return this.$store.getters['user/currentUser']
    },
    showUserForm () {
      return this.initialized && this.currentUser && !this.roomUsers[this.currentUser.uid]
    }
  },
  watch: {
    '$route.params.slug' (to, from) {
      this.roomId = this.$route.params.slug
      this.loadRoom()
    }
  },
  methods: {
    loadRoom () {
      this.initialized = false
      this.loading = false
      if (this.unsubscribe !== null) {
        this.unsubscribe()
      }
      if (this.roomId !== undefined) {
        this.$store.state.db.doc(`rooms/${this.roomId}`)
          .onSnapshot((doc) => {
            this.initialized = true
            if (!doc.exists) {
              this.$store.state.db.doc(`rooms/${this.roomId}`).set({users: {}})
              this.roomUsers = {}
            } else {
              this.roomUsers = doc.data().users || {}
            }
            this.$store.commit('room/SET_USERS', {users: this.roomUsers})
          })
        this.unsubscribe = this.$store.state.db.collection(`rooms/${this.roomId}/messages`).orderBy('createdAt')
          .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
              if (change.type === 'added') {
                this.roomMessages.push({...change.doc.data(), id: change.doc.id})
                this.scrollToEnd()
              }
            })
          })
      }
    },
    onScroll () {
    },
    sendMessage (event) {
      if ((event.ctrlKey || event.metaKey) && event.keyCode === 13) {
        if (this.content !== '') {
          this.$store.dispatch('room/sendMessage', { content: this.content, roomId: this.roomId, userId: this.currentUser.uid })
          this.content = ''
        }
      }
    },
    saveUserName () {
      this.roomUsers[this.currentUser.uid] = this.userName
      this.$store.state.db.doc(`rooms/${this.roomId}`).set({
        users: this.roomUsers
      })
    },
    scrollToEnd () {
      this.$nextTick(() => {
        var container = this.$el.querySelector('.chat__container')
        container.scrollTop = container.scrollHeight
      })
    },
    scrollTo () {
      this.$nextTick(() => {
        let currentHeight = this.$refs.chatContainer.scrollHeight
        let difference = currentHeight - this.totalChatHeight
        var container = this.$el.querySelector('.chat__container')
        container.scrollTop = difference
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.chat__container
  box-sizing: border-box
  height: calc(100vh - 9.5rem)
  overflow-y: auto
  padding: 10px
  background-color: #f2f2f2

.chat__form
  box-sizing: border-box
  display: flex
  align-items: center
  bottom: 0
  height: 4.9rem
  width: 100%
  background-color: #fff
  box-shadow: 0 -5px 10px -5px rgba(0,0,0,.2)
  
  textarea
    position: absolute
    padding: 1rem
    width: 100%
    background-color: transparent
    border: none
    outline: none
    font-size: 1.25rem

</style>
