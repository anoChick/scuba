const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()
const firestore = admin.firestore()
firestore.settings({
  timestampsInSnapshots: true
})
const webhooksRef = firestore.collection('webhooks')

const cors = require('cors')({ origin: true })
exports.webhook = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const webhookID = request._parsedUrl.pathname.slice(1)
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
            response.send(e.stack)
          }
        } else {
          response.send('No such document.')
        }

        return null
      })
      .catch(error => {
        response.send(error.message)
      })
  })
})
