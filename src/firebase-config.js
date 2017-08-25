import firebase from "firebase";
import fbInfo from "./firebase-bucket-info";

var config = fbInfo;
firebase.initializeApp(config);
export default firebase;