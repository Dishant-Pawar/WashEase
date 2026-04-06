require('dotenv').config();
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

const app = express();
const PORT = process.env.PORT || 4000;

// Initialize Firebase Admin (Place serviceAccount.json in server root)
// admin.initializeApp({
//   credential: admin.credential.cert(require('./serviceAccount.json')),
//   databaseURL: 'https://waseease-2976112745122822859.firebaseio.com'
// });

app.use(cors());
app.use(express.json());

// 1. Root / Health
app.get('/', (req, res) => res.send('WashEase API is Live 🚀'));

// 2. Auth Routes
app.post('/api/auth/register', (req, res) => {
  // Logic: Create Firebase User -> Profile Document
  res.status(201).json({ success: true, user: { name: 'Alex' } });
});

// 3. Service Routes
app.get('/api/services', (req, res) => {
  // Logic: Fetch from Firestore 'services'
  res.json([
    { id: '1', name: 'Wash & Fold', price: 4.5, category: 'LAUNDRY' },
    { id: '2', name: 'Dry Clean', price: 15.0, category: 'CLEANING' }
  ]);
});

// 4. Order Management
app.post('/api/orders', (req, res) => {
  const { userId, items, locationId } = req.body;
  // Logic: Create 'orders' document with status PLACED
  res.status(201).json({ success: true, orderId: 'ORD_' + Date.now() });
});

app.get('/api/orders/:id/tracking', (req, res) => {
  // Logic: Real-time order status and courier location
  res.json({
    status: 'WASHING',
    eta: '12 mins',
    timeline: [
      { id: '1', title: 'Order Placed', time: '10:30 AM', status: 'completed' },
      { id: '2', title: 'Picked Up', time: '11:15 AM', status: 'completed' },
      { id: '3', title: 'Washing', time: '12:00 PM', status: 'active' }
    ]
  });
});

// 5. Payment Routes (Stripe)
app.post('/api/payments/create-intent', async (req, res) => {
  const { amount, currency = 'usd' } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // convert to cents
      currency,
      automatic_payment_methods: { enabled: true },
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`WashEase API Running on http://localhost:${PORT}`);
});
