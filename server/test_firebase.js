const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const serviceAccountPath = path.join(__dirname, 'serviceAccount.json');

async function testConnection() {
  console.log('--- WashEase Firebase Connection Test ---');

  try {
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
    console.log(`✅ File read. Project ID: ${serviceAccount.project_id}`);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log('✅ Admin initialized.');

    const db = admin.firestore();
    console.log('⏳ Testing Firestore read...');
    
    // This will check if we can reach the database
    const snapshot = await db.collection('_test_connection_').limit(1).get();
    console.log('✅ Success! Firestore is reachable.');
    process.exit(0);
  } catch (error) {
    console.log('❌ Error:', error.message);
    process.exit(1);
  }
}

testConnection();
