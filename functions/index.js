const functions = require('firebase-functions')
const stripe = require('stripe')(
  'sk_test_51GuKERLy9mbkpBNA5UBXHwKpOGxDcf6ieHYQO4YAzCx1UXAqkDZNmbHcB26nF8obqgG1P2ePZK2gSiI3ePmWlcu7003cuBB7LA'
)

// const session = await stripe.checkout.sessions.create({
//   payment_method_types: ['card'],
//   line_items: [
//     {
//       price: '',
//       quantity: 1,
//     },
//   ],
//   mode: 'payment',
//   success_url: '',
//   cancel_url: '',
// })

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.createStripeSession = functions.https.onRequest((req, res) => {
  res.send('hello world')
})
