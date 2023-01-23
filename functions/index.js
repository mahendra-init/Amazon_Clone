const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors');
const { response } = require("express");
import { stripe_privateKey } from './config';
const stripe = require('stripe')(stripe_privateKey)


const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: '*'
  }));

  
app.get('/', (req, res) => res.status(200).send('hello world'));

app.post('/payments/create', async (req, res) => {
    const total = req.query.total;

    console.log('payment req recieved', total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'inr',
        payment_method: "pm_card_visa"
    });

    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

exports.api = functions.https.onRequest(app)
