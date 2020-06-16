import Stripe from 'stripe'

const functions = require('firebase-functions')
const stripe = new Stripe('key goes here')

const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [
    {
      price: '',
      quantity: 1,
    },
  ],
  mode: 'payment',
  success_url: '',
  cancel_url: '',
})

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
