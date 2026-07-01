# Scalable Auth RBAC Task Manager - Frontend

This is the React client application for the Scalable Auth RBAC Task Manager, scaffolded on **React + Vite**. It communicates with the backend APIs via a modular Axios service layer and manages session security using the Context API.

## Features

- **JWT Authentication Flow**: Custom hooks and state providers that manage login/registration requests, persist authentication tokens in local storage, and intercept expired credentials.
- **Role-Based Routing & Views**: Conditional route rendering checking user roles (e.g. hiding specific controls from standard `USER` roles and showing administrative controls only to `ADMIN` users).
- **Responsive Dashboard Layouts**: A collapsible Sidebar, custom Global Navbar, and dynamic layouts for content routing.
- **Task Workspace**: Complete CRUD interaction (list, create, edit, filter, delete tasks) bound to hooks state.
- **Vite Proxy Integration**: API requests routed transparently via Vite proxy (`/api` mapped to `http://localhost:5000/api`) avoiding local CORS settings discrepancies.

## Directory Structure

```text
frontend/
├── index.html         # Main SPA index container
├── vite.config.js     # Dev server & reverse proxy configurations
├── src/
│   ├── main.jsx       # Mounts React DOM
│   ├── App.jsx        # Routing engine & providers wrap
│   ├── index.css      # Design system variables, typography & layout styling
│   ├── components/    # Dumb / reusable layout components
│   ├── context/       # Auth state provider context
│   ├── hooks/         # Custom react hooks (useAuth, useTasks)
│   ├── layouts/       # Structural shell wrappers (Dashboard, Auth)
│   ├── pages/         # High level view route panels
│   ├── services/      # Axios client configuration & API wrapper methods
│   └── utils/         # Formatting date/text helpers
```

## Running the Application

### Installation
Make sure you are in the `/frontend` directory:
```bash
npm install
```

### Run Dev Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.
