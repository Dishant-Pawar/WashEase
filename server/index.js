require('dotenv').config();
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

const app = express();
const PORT = process.env.PORT || 4000;

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(require('./serviceAccount.json')),
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
});

// 2. Start SyncManager (Data Synchronization)
const syncManager = require('./services/sync_manager');
syncManager.init();

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

// 6. Admin Dashboard (Aggregated Statistics)
app.get('/api/admin/dashboard', async (req, res) => {
  try {
    const db = admin.firestore();
    
    // Fetch stats in parallel for speed
    const [ordersSnap, usersSnap, couriersSnap, errorsSnap] = await Promise.all([
      db.collection('orders').get(),
      db.collection('users').get(),
      db.collection('couriers').get(),
      db.collection('sync_errors').where('retried', '==', false).get()
    ]);

    const stats = {
      orders: {
        total: ordersSnap.size,
        active: ordersSnap.docs.filter(d => !['DELIVERED', 'CANCELLED'].includes(d.data().status)).length,
        delivered: ordersSnap.docs.filter(d => d.data().status === 'DELIVERED').length
      },
      users: {
        total: usersSnap.size,
        premium: usersSnap.docs.filter(d => d.data().isPremium).length
      },
      fleet: {
        totalCouriers: couriersSnap.size,
        activeLoad: couriersSnap.docs.reduce((acc, doc) => acc + (doc.data().currentLoad || 0), 0),
        available: couriersSnap.docs.filter(d => (d.data().currentLoad || 0) < 5).length
      },
      systemHealth: {
        pendingSyncErrors: errorsSnap.size,
        lastBackup: new Date().toISOString()
      }
    };

    res.json({ success: true, stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`WashEase API Running on http://localhost:${PORT}`);
});
