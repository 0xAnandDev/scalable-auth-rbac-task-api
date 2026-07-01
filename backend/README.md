# Scalable Auth RBAC Task API - Backend

This is the backend implementation of the Scalable Auth RBAC Task application. It is built using Node.js, Express, MongoDB (Mongoose), and structured using the **MVC + Services Architecture** to cleanly segregate concerns.

## Features

- **JWT Authentication & RBAC**: Session-less authentication using JWTs. Role-based authorization rules (e.g., `USER`, `ADMIN`) guarding critical endpoints.
- **MVC + Services Design Pattern**:
  - **Routes**: Direct incoming HTTP requests to corresponding controllers.
  - **Controllers**: Handle request extraction, trigger the services layer, and format consistent JSON responses.
  - **Services**: Enforce domain-specific business rules, database queries, and computations.
  - **Models**: Standardized Mongoose data validation schemas.
- **Centralized Error Handling**: Unified error response payload format utilizing a custom `ApiError` class and generic error handler middleware.
- **Input Validation**: Schema-level sanitization and validation on requests via `express-validator` middleware.
- **Request Logging**: Built using `morgan` routing log streams directly into a structured `winston` log file and terminal console transport.
- **Production Security Setup**:
  - HTTP Header protections via `helmet`
  - Cross-Origin Resource Sharing settings via `cors`
  - Response payload compression via `compression`
  - Rate limiting via `express-rate-limit`

## Directory Hierarchy

```text
backend/
├── server.js              # Bootstraps Express app & Mongoose DB
├── app.js                 # Defines Express middlewares & routes mapping
├── config/                # DB and Logger setup definitions
├── controllers/           # Formats response, orchestrates services
├── docs/                  # API swagger configuration specifications
├── middleware/            # Auth, Roles validation, Error, express-validator helpers
├── models/                # Database entities schemas (User, Task)
├── routes/                # Versioned (v1) REST Endpoints
├── seed/                  # Seeding admin users script
├── services/              # Business logic layer
├── utils/                 # Constants, ApiResponse, ApiError formats, AsyncHandler wrapper
└── validators/            # Request body schemas definitions
```

## Running the API

### Configuration
1. Clone the environment file:
   ```bash
   cp .env.example .env
   ```
2. Populate database URI and JWT secret values.

### Installation
```bash
npm install
```

### Seeding Admin User
Create a default admin user configuration:
```bash
npm run seed
```

### Run Server
- **Development**: Starts Nodemon watcher:
  ```bash
  npm run dev
  ```
- **Production**:
  ```bash
  npm run start
  ```
