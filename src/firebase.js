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
export const database = firebase.database();
export const dbRef = firebase.database().ref("/");
export default firebase;