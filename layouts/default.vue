<template>
  <v-app>
    <v-toolbar dark color='primary'>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        title: 'Sonic Chat'
      }
    }
  }
</script>
