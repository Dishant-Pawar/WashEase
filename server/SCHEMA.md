# WashEase Firebase Data Schema

This document defines the real-time structure for our "Fluid Sanctuary" laundry application.

## 1. `users` Collection
Each user document contains their profile and billing setup.
```json
{
  "uid": "USER_ID",
  "profile": {
    "name": "Alex Johnson",
    "email": "alex@example.com",
    "membership": "PLATINUM", // SILVER, GOLD, PLATINUM
    "avatarUrl": "https://...",
    "referralCode": "WASH10AF"
  },
  "billing": {
    "stripeCustomerId": "cus_...",
    "savedMethods": ["pm_..."]
  },
  "locations": [
    {
      "id": "loc_1",
      "label": "Home",
      "address": "Sunset Blvd, 24",
      "building": "The Grande",
      "coords": { "lat": 0, "lng": 0 }
    }
  ]
}
```

## 2. `services` Collection
Defines the laundry categories and individual items.
```json
{
  "id": "wash-fold",
  "name": "Wash & Fold",
  "category": "LAUNDRY",
  "basePrice": 0,
  "items": [
    { "id": "shirt", "name": "Cotton Shirt", "price": 4.5, "per": "item" }
  ],
  "indicators": ["UV Treatment", "Eco-friendly"]
}
```

## 3. `orders` Collection (Main Real-time Sync)
Tracks the entire journey from pickup to delivery.
```json
{
  "orderId": "ORD_2944",
  "userId": "USER_ID",
  "items": [
    { "id": "shirt", "name": "Cotton Shirt", "qty": 5, "price": 4.5 }
  ],
  "totals": {
    "sub": 22.5,
    "discount": 4.5, // 20% Platinum
    "tax": 1.44,
    "final": 19.44
  },
  "status": "WASHING", // PLACED, PICKUP_ASSIGNED, PICKED_UP, WASHING, DRYING, OUT_FOR_DELIVERY, COMPLETED
  "timestamps": {
    "placed": "2026-04-06T10:30:00Z",
    "pickedUp": "2026-04-06T11:15:00Z",
    "washing": "2026-04-06T12:00:00Z",
    "completed": null
  },
  "courier": {
    "id": "CO_8812",
    "name": "Robert Fox",
    "phone": "+1234567890",
    "location": { "lat": 0, "lng": 0 },
    "eta": "12 mins"
  }
}
```

## 4. `tracking` (Sub-collection under Order OR Standalone)
For high-frequency location updates if using Google Maps API.
```json
{
  "orderId": "ORD_2944",
  "coords": { "lat": 0, "lng": 0 },
  "lastUpdated": "2026-04-06T12:05:01Z"
}
```
