# Scalable Auth RBAC Task API - Monorepo

Welcome to the **Scalable Auth RBAC Task API** project structure! This is a production-ready, interview-friendly monorepo designed with clean separation of concerns, modularity, and scalability.

## Tech Stack Overview

- **Backend**: Node.js, Express.js, MongoDB with Mongoose, JWT Authentication, Role-Based Access Control (RBAC), security middlewares, Morgan/Winston logging, Swagger API documentation.
- **Frontend**: React, Vite, Axios service layer, Context API for state management, custom hooks, reusable components.

## Folder Directory Structure

```text
scalable-auth-rbac-task-api/
├── .gitignore
├── README.md
├── backend/
│   ├── .env.example
│   ├── .gitignore
│   ├── README.md
│   ├── package.json
│   ├── server.js
│   ├── app.js
│   ├── config/             # DB connection, Winston Logger config
│   ├── controllers/        # Express controllers (auth, task)
│   ├── docs/               # Swagger configuration
│   ├── middleware/         # Auth, Roles, Error, Validation middlewares
│   ├── models/             # Mongoose Schemas (User, Task)
│   ├── routes/             # Versioned (v1) REST Endpoints
│   ├── seed/               # Database seed scripts
│   ├── services/           # Business logic layer
│   ├── utils/              # Standard Response, Error, Constants, Logging utils
│   └── validators/         # Input validators (express-validator)
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── README.md
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── components/     # UI components (common, tasks)
│       ├── context/        # Authentication context
│       ├── hooks/          # Custom react hooks (useAuth, useTasks)
│       ├── layouts/        # Layout wrappers (Auth, Dashboard)
│       ├── pages/          # View/Page components (Login, Register, Dashboard, Tasks)
│       ├── services/       # Axios and HTTP API services
│       └── utils/          # Formatting/Date helper utils
├── postman/                # Exported Postman collections
└── screenshots/            # Visual previews and media assets
```

## Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas URI)

### Getting Started

1. **Configure Environment Variables**:
   Go to `/backend` directory:
   ```bash
   cp .env.example .env
   ```
   Fill in your configuration settings.

2. **Backend Development Setup**:
   ```bash
   cd backend
   npm install
   npm run seed  # Seed the initial admin account
   npm run dev   # Start the Express server in development mode
   ```

3. **Frontend Development Setup**:
   ```bash
   cd ../frontend
   npm install
   npm run dev   # Start the Vite development server
   ```

## Key Architectures & Features

- **MVC + Services Architecture**: Decoupled routes, controllers, and services ensuring that business logic is testable and maintainable.
- **Robust Security**: Configured with `helmet` headers, CORS protection, request compression, and request rate-limiting.
- **Unified API Design**: All REST endpoints return consistent JSON payload shapes.
- **API Versioning**: Scalable route definition separating v1 configurations for future-proofing APIs.
