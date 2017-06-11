import firebase from "firebase";

var config = {
    apiKey: "AIzaSyAc-kMQh9d4LPAJsgE1pWp0RJwDgFRf2Eg",
    authDomain: "fridge-app-1701d.firebaseapp.com",
    databaseURL: "https://fridge-app-1701d.firebaseio.com",
    projectId: "fridge-app-1701d",
    storageBucket: "fridge-app-1701d.appspot.com",
    messagingSenderId: "680100870834"
};
firebase.initializeApp(config);

export const auth = firebase.auth();
export const dbRef = firebase.database().ref("/");
export const userRef = firebase.database().ref("/users");
export const groupRef = firebase.database().ref("/groups");
export default firebase;