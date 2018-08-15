<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6 mt-5>
      <v-card>
        <v-card-title class="headline">Sonic Chatへようこそ</v-card-title>
        <v-card-text>
          <p>Sonic Chatはインスタントチャットサービスです。</p>
          <p>さっと作ってすぐ使えるシンプルなチャットを提供します。</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click='generateRoom'>チャットを始める</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import uuid from 'uuid'
export default {
  methods: {
    generateRoom () {
      const roomId = uuid.v4()
      this.$router.push({ path: `/${roomId}` })
    }
  }
}
</script>
