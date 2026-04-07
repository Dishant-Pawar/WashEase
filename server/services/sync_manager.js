const admin = require('firebase-admin');

/**
 * SyncManager handles synchronization between Firestore collections (services).
 * 
 * In a production environment, these would be separate Cloud Functions triggers. 
 * Since we're in a local server environment, we use real-time listeners.
 */
class SyncManager {
  constructor() {
    this.db = admin.firestore();
  }

  // 1. Initialize Listeners (Inter-Service Sync)
  init() {
    console.log('🚀 SyncManager: Monitoring collections for events...');
    this.syncOrderToUser();
    this.syncPaymentToOrder();
    this.syncFleetCapacity();
  }

  /**
   * Sync: Order Status -> User History
   * Goal: Keep a count of total orders on the User's profile.
   */
  syncOrderToUser() {
    this.db.collection('orders').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === 'added') {
          const orderData = change.doc.data();
          const userId = orderData.userId;
          
          console.log(`🔔 Event: New Order [${change.doc.id}]. Syncing to User [${userId}]...`);
          
          try {
            // Atomic update using increment
            await this.db.collection('users').doc(userId).set({
              stats: {
                totalOrders: admin.firestore.FieldValue.increment(1),
                lastOrderAt: admin.firestore.FieldValue.serverTimestamp()
              }
            }, { merge: true });
            
            console.log(`✅ Success: User [${userId}] stats updated.`);
          } catch (err) {
            this.handleSyncFailure('orders_to_users', change.doc.id, err);
          }
        }
      });
    });
  }

  /**
   * Sync: Payment Received -> Update Order Status to 'PAID'
   */
  syncPaymentToOrder() {
    this.db.collection('payments').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === 'added' || change.type === 'modified') {
          const paymentData = change.doc.data();
          
          if (paymentData.status === 'succeeded' && paymentData.orderId) {
            console.log(`🔔 Event: Payment Confirmed for Order [${paymentData.orderId}]`);
            
            try {
              await this.db.collection('orders').doc(paymentData.orderId).update({
                status: 'PAID',
                paidAt: admin.firestore.FieldValue.serverTimestamp()
              });
              console.log(`✅ Success: Order [${paymentData.orderId}] status marked as PAID.`);
            } catch (err) {
              this.handleSyncFailure('payments_to_orders', change.doc.id, err);
            }
          }
        }
      });
    });
  }

  /**
   * Sync: Order Assigned Courier -> Update Courier Load & Availability
   * Ensures the fleet's capacity is always synchronized.
   */
  syncFleetCapacity() {
    this.db.collection('orders').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        const orderData = change.doc.data();
        const courierId = orderData.courierId;

        if (!courierId) return; // No courier assigned

        // When an order is newly assigned or updated with a courier
        if (change.type === 'added' || change.type === 'modified') {
          const oldData = change.doc.data(); // Note: snapshot.docChanges() gives current state
          
          console.log(`🚚 Syncing Courier [${courierId}] capacity for Order [${change.doc.id}]...`);
          
          try {
            // Rule: If order status is NOT 'DELIVERED', it's an active load
            const isActiveOrder = !['DELIVERED', 'CANCELLED'].includes(orderData.status);
            
            if (isActiveOrder) {
              await this.db.collection('couriers').doc(courierId).update({
                currentLoad: admin.firestore.FieldValue.increment(1),
                lastActiveAt: admin.firestore.FieldValue.serverTimestamp()
              });
            } else {
              // Mark order as completed in fleet load
              await this.db.collection('couriers').doc(courierId).update({
                currentLoad: admin.firestore.FieldValue.increment(-1),
                totalCompletedDeliveries: admin.firestore.FieldValue.increment(1)
              });
            }
            console.log(`✅ Courier [${courierId}] capacity updated.`);
          } catch (err) {
            this.handleSyncFailure('fleet_capacity_sync', change.doc.id, err);
          }
        }
      });
    });
  }

  /**
   * Error Handling for Sync Failures
   */
  handleSyncFailure(syncKey, docId, error) {
    console.error(`❌ Sync Failure [${syncKey}] on Doc [${docId}]:`, error.message);
    
    // Log failures to a dedicated collection for replay/retry
    this.db.collection('sync_errors').add({
      syncType: syncKey,
      sourceDocId: docId,
      error: error.message,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      retried: false
    });
  }
}

module.exports = new SyncManager();
