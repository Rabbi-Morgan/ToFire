import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseApp = firebase.initializeApp({
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  apiKey: "AIzaSyDS3WlWZ7cPMlCyw7dJbmjxEZ6cktWis1A",
  authDomain: "todo-app-16342.firebaseapp.com",
  databaseURL: "https://todo-app-16342-default-rtdb.firebaseio.com",
  projectId: "todo-app-16342",
  storageBucket: "todo-app-16342.appspot.com",
  messagingSenderId: "775591751295",
  appId: "1:775591751295:web:87d02bb13c27ad52df594a",
  measurementId: "G-VS6GVBD5J2"
})

const db = firebaseApp.firestore();

export {db};