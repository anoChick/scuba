const functions = require('firebase-functions')
const admin = require('firebase-admin')
const request = require('request')

admin.initializeApp()
const firestore = admin.firestore()
firestore.settings({
  timestampsInSnapshots: true
})
const webhooksRef = firestore.collection('webhooks')

const cors = require('cors')({ origin: true })
exports.webhook = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const webhookID = req._parsedUrl.pathname.slice(1)
    webhooksRef
      .doc(webhookID)
      .get()
      .then(doc => {
        if (doc.exists) {
          const code = doc.data().code
          try {
            // eslint-disable-next-line no-eval
            eval(code)
          } catch (e) {
            res.send(e.stack)
          }
        } else {
          res.send('No such document.')
        }

        return null
      })
      .catch(error => {
        res.send(error.message)
      })
  })
})
