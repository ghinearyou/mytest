const firebase = require('firebase')
require('dotenv').config()

const { APP_ID, API_KEY, AUTHDOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_ID } = process.env

let firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTHDOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_ID,
    appId: APP_ID
  };

const db = firebase.initializeApp(firebaseConfig);

const firestore = db.firestore();

exports.register = async (req, res) => {
  try {
    let data = {
      first_name: req.body.first,
      last_name: req.body.last,
      username: req.body.username,
      email: req.body.email,
      phone_number: req.body.phone,
      password: req.body.password,
      token: ''
    }
    
    await firestore.collection('users').doc().set(data)
    data.password = undefined
    res.status(201).send({
      status: 'success',
      result: data
    })
  } catch (err) {
    console.log(err);
    res.status(500).send({})
  }
}

exports.getAllUser = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
    res.status(500).send({})
  }
}