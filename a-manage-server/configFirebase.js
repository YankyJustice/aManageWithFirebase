const firebase = require("firebase-admin");

const serviceAccount = require("./a-manage-firebase-adminsdk-2y783-8e50388691.json");

firebase.initializeApp({
	credential: firebase.credential.cert(serviceAccount)
});

const db = firebase.firestore()
const Users = db.collection('Users')

module.exports = {Users, db}
