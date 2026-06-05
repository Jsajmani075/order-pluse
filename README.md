# 📦 OrderPulse — Real-Time Order Tracking System

A backend service that pushes live database change notifications to connected clients using **Socket.IO**. Built to demonstrate real-time system design using Node.js, PostgreSQL, and event-driven architecture.

> **The goal:** When any order is created, updated, or deleted in the database, every connected client receives the change instantly — no polling required.

---

## 🏗️ Architecture Overview

```
Client (browser)
     │
     │  WebSocket (Socket.IO)
     ▼
Express + Socket.IO Server
     │
     ├──► REST API ──► Zod Validation ──► Sequelize ORM ──► PostgreSQL
     │                                                           │
     │              DB Change Detected (pg trigger + NOTIFY) ◄──┘
     │
     └──► Socket.IO emit("order_changed") ──► All connected clients
```

**Why no polling?** The server uses PostgreSQL's native `LISTEN/NOTIFY` mechanism via a dedicated listener. When any mutation happens on the `orders` table (via a DB trigger), PostgreSQL notifies the Node.js listener, which immediately emits the change to all connected Socket.IO clients — completely decoupled from the HTTP layer.

---

## 🛠️ Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Runtime | Node.js + Express.js | Non-blocking I/O, excellent Socket.IO support |
| Real-time | Socket.IO | WebSocket with fallback transports and broadcast support |
| Database | PostgreSQL + Sequelize | Mature ORM with migrations; native LISTEN/NOTIFY for change detection |
| Validation | Zod | Schema-first, composable, developer-friendly error messages |
| Logging | Winston | Structured logging with configurable transports |
| Transpiler | Babel + Nodemon | ES module syntax in Node.js CommonJS environment |

---

## 📁 Project Structure

```
order-pluse/
├── client/
│   └── index.html                  # Browser client — connects via Socket.IO, renders live order feed
│
├── src/
│   ├── config/
│   │   └── config.js               # Sequelize DB connection config (reads from .env)
│   │
│   ├── db/
│   │   ├── models/
│   │   │   └── order.js            # Order model: id, customerName, productName, status, timestamps
│   │   │
│   │   └── migrations/
│   │       ├── <timestamp>-create-orders.js          # Creates the orders table
│   │       └── <timestamp>-create-orders-triggers.js # PostgreSQL trigger + notify function
│   │
│   ├── errors/
│   │   └── AppError.js             # Central error class + global error handling middleware
│   │
│   ├── Handlers/
│   │   └── order.Handlers.js       # Business logic — DB queries for orders
│   │
│   ├── json-schemas/
│   │   └── order.validation.js     # Zod schemas for create/update request bodies
│   │
│   ├── Libs/
│   │   └── Logger.js               # Winston logger configuration
│   │
│   ├── Listeners/
│   │   └── pgListener.js           # PostgreSQL LISTEN/NOTIFY listener — triggers Socket.IO emit
│   │
│   ├── rest-resources/
│   │   ├── routes/
│   │   │   └── order.routes.js     # Express router — CRUD endpoints for /api/v1/order
│   │   │
│   │   ├── controllers/
│   │   │   └── order.controller.js # Request handlers — delegates to Handlers, sends response
│   │   │
│   │   └── middlewares/
│   │       └── validate.js         # Zod validation middleware
│   │
│   └── socket-resources/
│       └── socket.js               # Socket.IO setup — exposes io instance, manages connections
│
├── index.js                        # App entry point — Express + Socket.IO server init
├── .sequelizerc                    # Tells Sequelize CLI where config/models/migrations live
├── .babelrc                        # Babel config for ES module transpilation
├── .envsample                      # Environment variable template — copy to .env
├── .gitignore
└── package.json
```

---

## ⚡ Quick Start

### Prerequisites

- **Node.js** v18+
- **PostgreSQL** with [pgAdmin](https://www.pgadmin.org/download/) or local install — must be running

### 1. Clone the repo

```bash
git clone https://github.com/Jsajmani075/order-pluse.git
cd order-pluse
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

```bash
cp .envsample .env
```

Open `.env` and fill in your values:

```env
PORT=8080
DB_NAME=order_pulse_db
DB_PORT=5432
DB_USER_NAME=postgres
DB_PASSWORD=your_pg_password
DB_DIALECT=postgres
DB_HOST=127.0.0.1
```

> 💡 Make sure PostgreSQL is running and the credentials match your local setup.

### 4. Set up the database

```bash
npm run make:setup
```

This single command will:
- Create the `order_pulse_db` database
- Run all migrations (creates the `orders` table + DB trigger for NOTIFY)

### 5. Start the backend server

```bash
npm run start
```

Server starts at `http://localhost:8080`

### 6. Open the frontend client

In a new terminal, run:

```bash
open client/index.html
```

This opens the browser client directly (no separate server needed). It connects to `localhost:8080` via Socket.IO and displays real-time order updates as they happen.

---

## 🔌 API Reference

**Base URL:** `http://localhost:8080/api/v1`

---

### `GET /order` — Fetch All Orders (Paginated)

```bash
curl --location 'http://localhost:8080/api/v1/order?pageNo=1&limit=10'
```

**Query Params:**

| Param | Type | Default | Description |
|---|---|---|---|
| `pageNo` | number | 1 | Page number |
| `limit` | number | 10 | Records per page |

**Response:**
```json
{
 "data": {
        "success": true,
        "currentPage": null,
        "totalPages": 2,
        "totalRecords": 17,
  "data": [...]
}
```

---

### `POST /order` — Create Order

```bash
curl --location 'http://localhost:8080/api/v1/order' \
--header 'Content-Type: application/json' \
--data '{
    "customerName": "Jagjot Singh Ajmani",
    "productName": "Mobile Phone",
    "status": "pending"
}'
```

**Request Body:**
```json
{
  "customerName": "Jagjot Singh Ajmani",
  "productName": "Mobile Phone",
  "status": "pending"
}
```

> `status` accepts: `pending` | `shipped` | `delivered`

---

### `PUT /order` — Update Order

```bash
curl --location --request PUT 'http://localhost:8080/api/v1/order' \
--header 'Content-Type: application/json' \
--data '{
    "id": 3,
    "customerName": "Jagjot Ajmani",
    "status": "shipped"
}'
```

**Request Body (partial update supported):**
```json
{
  "id": 3,
  "customerName": "Jagjot Ajmani",
  "status": "shipped"
}
```

---

### `DELETE /order/:id` — Delete Order

```bash
curl --location --request DELETE 'http://localhost:8080/api/v1/order/3'
```

---

> 🔔 Every `POST`, `PUT`, or `DELETE` triggers a real-time `order_changed` event to all connected Socket.IO clients — no page refresh needed.

---

## 📡 Real-Time Events (Socket.IO)

The browser client listens for this event:

| Event | When Emitted | Payload |
|---|---|---|
| `order_changed` | Any insert, update, or delete on the orders table | Updated order object (or deleted id) |

The event is fired via PostgreSQL's native `LISTEN/NOTIFY` — the DB trigger notifies the Node.js pg listener, which broadcasts to all Socket.IO clients.

---

## 🔍 Design Decisions

**Why PostgreSQL LISTEN/NOTIFY instead of just Sequelize hooks?**
Using a DB-level trigger + `LISTEN/NOTIFY` means change detection is decoupled from the application layer. Even if someone updates the DB directly (via pgAdmin, a migration, or another service), clients still get notified. Sequelize hooks only fire through the ORM — they silently miss direct DB changes. This is the more production-correct approach.

**Why Socket.IO over SSE or long-polling?**
Socket.IO gives bidirectional real-time communication with automatic reconnection, fallback transports (WebSocket → HTTP long-polling), and easy room/namespace support. For a production system with user-scoped notifications, Socket.IO rooms are a natural next step without changing the architecture.

**Why Zod?**
Schema-first validation that's composable and TypeScript-compatible. Paired with a centralized validation middleware, it keeps controllers clean and pushes input sanitization to the system boundary — errors are caught before they reach business logic.

**Why a centralized error handler?**
All errors flow through a single `AppError` class and Express error middleware. This means consistent error response shape across the entire API, easier debugging via Winston logs, and no scattered try/catch blocks in controllers.

**Scalability path:**
The PostgreSQL listener can be moved to a dedicated microservice. Socket.IO can scale horizontally using the `socket.io-redis` adapter — multiple Node instances share the same broadcast bus. The paginated `GET /order` endpoint ensures the API stays performant as the dataset grows.

---

## 📋 Orders Table Schema

```sql
CREATE TABLE orders (
  id             SERIAL PRIMARY KEY,
  customer_name  VARCHAR(255) NOT NULL,
  product_name   VARCHAR(255) NOT NULL,
  status         VARCHAR(20) CHECK (status IN ('pending', 'shipped', 'delivered')),
  created_at     TIMESTAMP DEFAULT NOW(),
  updated_at     TIMESTAMP DEFAULT NOW()
);
```

---

## 👤 Author

**Jagjot Singh Ajmani**
- GitHub: [@Jsajmani075](https://github.com/Jsajmani075)
- Email: jagjotajmani075@gmail.com
