<template lang="pug">
  div
    .message(v-for="(message, index) in messages", :class="message.userId === currentUser.uid ? 'is-mine' : ''")
      .message__container
        .message__user {{ users[message.userId] }}
        .message__content(v-html="message.content")
        .message__created-at {{ message.createdAt | moment }}
</template>

<script>
import moment from 'moment'

export default {
  data () {
    return {}
  },
  props: [
    'messages'
  ],
  computed: {
    users () {
      return this.$store.getters['room/users']
    },
    currentUser () {
      return this.$store.getters['user/currentUser']
    }
  },
  filters: {
    moment (date) {
      return moment(date).format('YYYY/MM/DD HH:mm:ss')
    }
  }
}
</script>

<style lang="sass" scoped>
.message
  &.is-mine
    text-align: right
    .message__container
      margin-left: 10px
      margin-right: 0
      background: #b1dead
    .message__user
      display: none
.message__container
  display: inline-block
  padding: 10px 20px
  background: white
  position: relative
  margin-right: 10px
  margin-bottom: 10px
  border-radius: 10px
  text-align: left
  min-width: 300px
.message__user
  font-weight: bold
.message__content
  white-space: pre
  margin-bottom: 5px
.message__created-at
  text-align: right
  font-size: 12px
  color: #555
</style>
