# WashEase Laundry Platform 🧺✨

**WashEase** is a high-end, editorial-focused laundry application designed for professional care and fast delivery. Built with React Native (Expo) and a real-time Node.js/Firebase backend.

---

## 🏛️ Project Architecture

This project follows a **Database-per-Service** pattern to ensure loose coupling and scalability. All cross-service synchronization is handled by an internal **Event-Driven SyncManager**.

### 🌟 Key Features
- **Proportional Flex UI**: Responsive onboarding and service screens.
- **Event-Driven Sync**: 
    - `Order` -> `User Stats` (Atomic counts).
    - `Payment` -> `Order Status` (Real-time updates).
    - `Fleet` -> `Capacity Management` (Load balancing).
- **Admin Dashboard API**: Unified statistics across all services.

---

## 🛠️ Tech Stack
- **Frontend**: React Native (Expo SDK 54), Expo Router, Lucide Icons, Reanimated.
- **Backend**: Node.js (Express), Firebase Admin SDK, Stripe API.
- **Design System**: Fluid Sanctuary (Modern glassmorphism & soft color palettes).

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- Expo Go (for testing the app)
- Firebase Account

### 2. Installation
```bash
# Install root dependencies
npm install

# Install server dependencies
cd server
npm install
```

### 3. Setup Secrets (CRITICAL)
For security, credentials are NOT stored in Git.
1. Download `serviceAccount.json` from **Firebase Console > Project Settings > Service Accounts**.
2. Save it as `server/serviceAccount.json`.
3. Create `server/.env` and add:
   ```env
   PORT=4000
   FIREBASE_PROJECT_ID=your-project-id
   STRIPE_SECRET=your-stripe-secret
   ```

### 4. Running the Project
```bash
# Start the App
npx expo start

# Start the Backend
cd server
npm run dev
```

---

## 📡 API Endpoints (Local: `http://localhost:4000`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/api/admin/dashboard` | Unified Cross-Service Statistics (Fleet, Orders, Users) |
| **GET** | `/api/services` | Fetches all available laundry services |
| **POST** | `/api/orders` | Places a new laundry order |
| **GET** | `/api/orders/:id/tracking` | Real-time order tracking and timeline |

---

## 📜 System Rulebook
See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed documentation on how data synchronization and state transitions are managed.

**Crafted with 💙 by WashEase Team**
