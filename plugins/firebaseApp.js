import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyCetJaSqcl3p2hQIL2IySyCaZOZKeGzHWM',
  authDomain: 'sonic-chat.firebaseapp.com',
  databaseURL: 'https://sonic-chat.firebaseio.com',
  projectId: 'sonic-chat',
  storageBucket: 'sonic-chat.appspot.com',
  messagingSenderId: '448642425283'
}

if (firebase.apps.length === 0) {
  const firebaseApp = firebase.initializeApp(config)
  const firestore = firebaseApp.firestore()
  firestore.settings({
    timestampsInSnapshots: true
  })
}

export default firebase.app()
