const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')
const uuidv4 = require('uuid/v4')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()


admin.initializeApp(functions.config().firebase)

const db = admin.firestore()

const cors = require('cors')(
  {origin: true}
)

const fetch = () => {
  return new Promise((res, rej) => {
    db.collection('todos').get()
      .then((snapshot) => {
        let r = []
        snapshot.forEach((doc) => {
          const data =  doc.data()
          r.push(Object.assign({}, {id: doc.id}, data))
        })
        return res(r)
      })
      .catch((err) => {
        console.log('Error getting documents', err);
        return rej(err)
      });
  })
}

const create = (props) => {
  return new Promise((res, rej) => {
    let obj = Object.assign({}, props)
    let id = uuidv4()
    let docRef = db.collection('todos').doc(id)
    docRef
    .set(obj)
    .then(createResult => res(Object.assign({}, {id}, obj, createResult)))
    .catch(err => rej(err))
  })
}

const remove = (id) => {
  return new Promise((res,rej) => {
    db.collection('todos').doc(id).delete().then(res({id})).catch(err => rej(err))
  })
}

const requestHandler = promise => (req, res) => {
  promise
  .then(data => res.json(data))
  .catch(err => res.status(err.statusCode || 500).json(err))
}

const app = express()

app.use(cors)

app.get('/', (req, res) => {
  requestHandler(fetch())(req, res)
})

app.post('/', jsonParser, (req, res) => {
  requestHandler(create(req.body))(req, res)
})

app.delete('/object/:id', (req, res) => {
  requestHandler(remove(req.params.id))(req, res)
})


exports.todos = functions.https.onRequest(app)
