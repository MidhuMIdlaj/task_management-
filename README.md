# TaskFlow — Task Management Application (MERN + Clean Architecture)

A full task management app: Node/Express/MongoDB backend built with **Clean Architecture** and
**Inversify** dependency injection, JWT authentication, real-time updates via **Socket.io**, a
React/TypeScript frontend with data visualization (Recharts) and a responsive Tailwind UI.

Covers all 5 tasks from the brief:
1. Core task CRUD (Node/Express/MongoDB backend + React frontend)
2. JWT user authentication, protected API + login/register UI
3. Real-time updates via Socket.io (no manual refresh needed)
4. Task statistics endpoint + chart-based dashboard
5. Responsive design (Tailwind CSS, tested down to mobile widths)

---

## 1. Architecture

The backend follows **Clean Architecture** exactly as specified, with dependency direction
pointing inward (`interface` → `application` → `domain`, `infrastructure` implements `domain`
contracts) and Inversify wiring everything together.

```
backend/src/
├── domain/                     # Enterprise business rules — no framework dependencies
│   ├── entities/                # Task, User (plain classes with core behaviour, e.g. isOverdue())
│   ├── repository/               # ITaskRepository, IUserRepository — abstract contracts
│   │   └── (repositories/)
│   └── dtos/                    # CreateTaskDTO, UpdateTaskDTO, AuthDTO, StatsDTO
│
├── application/                # Application-specific business rules
│   ├── interfaces/               # Use case contracts (ICreateTaskUseCase, ILoginUseCase, ...)
│   └── useCases/                 # Use case implementations (task/, auth/, stats/)
│
├── infrastructure/             # Frameworks & drivers — implements domain/application contracts
│   ├── database/                 # Mongoose connection
│   ├── models/                   # Mongoose schemas (TaskModel, UserModel)
│   ├── repositories/              # MongoTaskRepository, MongoUserRepository (implement domain interfaces)
│   ├── services/                  # PasswordService (bcrypt), TokenService (JWT), SocketService (Socket.io)
│   └── di/                        # container.ts (Inversify bindings) + types.ts (DI symbols)
│
└── interface/                  # Delivery mechanism — HTTP
    ├── controllers/               # TaskController, AuthController, StatsController
    ├── routes/                    # task_management.router.ts, auth.router.ts, stats.router.ts
    └── middlewares/                # authMiddleware (JWT guard), errorHandler, asyncHandler
```

**Why this shape:** `domain` defines *what* the app needs (entities + repository interfaces) with
zero knowledge of Mongo or Express. `application` defines *use cases* — one class per business
operation — depending only on domain abstractions, injected via Inversify `@inject`. `infrastructure`
provides concrete implementations (Mongoose repositories, JWT/bcrypt services, the Socket.io
gateway) and is the only layer that talks to MongoDB. `interface` exposes everything over HTTP:
controllers call use cases (never repositories directly), and `task_management.router.ts` wires
routes to controller methods behind `authMiddleware`.

The `infrastructure/di/container.ts` file is the composition root: it binds every interface to its
implementation (`ITaskRepository → MongoTaskRepository`, `ICreateTaskUseCase → CreateTaskUseCase`,
etc.), so swapping MongoDB for another database only means writing a new repository class and
changing one binding line — no other layer changes.

The frontend is a standard React app (context for auth state, a `useTasks` hook that combines REST
fetch + live Socket.io events, a thin `services/` API layer, and Tailwind-based responsive
components).

---

## 2. Prerequisites

- Node.js 18+ and npm
- MongoDB (local install, Docker, or a free Atlas cluster)
- (Optional) Docker + Docker Compose, for the one-command setup below

---

## 3. Quick start — Docker Compose (fastest)

From the project root:

```bash
docker compose up --build
```

This starts MongoDB, the backend on **http://localhost:5000**, and the frontend on
**http://localhost:5173**. Open the frontend URL, register an account, and start creating tasks.

---

## 4. Manual setup (without Docker)

### 4.1 Backend

```bash
cd backend
cp .env.example .env      # edit MONGO_URI / JWT_SECRET if needed
npm install
npm run dev                # ts-node + nodemon, http://localhost:5000
```

Make sure MongoDB is running locally (`mongod`) or point `MONGO_URI` in `.env` at an Atlas
connection string.

Production build:
```bash
npm run build
npm start                  # runs compiled dist/server.js
```

### 4.2 Frontend

```bash
cd frontend
cp .env.example .env       # defaults already point at localhost:5000
npm install
npm run dev                 # http://localhost:5173
```

Production build:
```bash
npm run build
npm run preview
```

---

## 5. API overview

| Method | Endpoint             | Auth | Description                          |
|--------|-----------------------|------|---------------------------------------|
| POST   | `/api/auth/register`  | No   | Create account, returns JWT           |
| POST   | `/api/auth/login`     | No   | Login, returns JWT                    |
| GET    | `/api/tasks`          | Yes  | List the logged-in user's tasks       |
| POST   | `/api/tasks`          | Yes  | Create a task                         |
| PUT    | `/api/tasks/:id`      | Yes  | Update a task                         |
| DELETE | `/api/tasks/:id`      | Yes  | Delete a task                         |
| GET    | `/api/stats`          | Yes  | Aggregated task statistics            |
| GET    | `/api/health`         | No   | Health check                          |

Send `Authorization: Bearer <token>` on all protected routes.

**Real-time:** the frontend opens a Socket.io connection and joins a room named after the user's
id. The backend emits `task:created`, `task:updated`, and `task:deleted` to that room whenever the
corresponding use case runs, so every open tab for that user updates instantly with no refresh.

---

## 6. Verified

- `npx tsc --noEmit` passes with no errors on the backend (strict TypeScript).
- `npx tsc -b` and `npm run build` (Vite) both pass with no errors on the frontend.
- Both were built and compiled successfully in this environment. Running the app end-to-end
  requires a MongoDB connection, which isn't available in the sandbox this was built in — use the
  Docker Compose setup or the manual steps above to run and click through it yourself.

---

## 7. Live link

_Add your deployed link here after hosting (e.g. backend on Render/Railway, frontend on
Vercel/Netlify, database on MongoDB Atlas):_

**Live demo:** `<add-hosted-url-here>`

---

## 8. Project structure (full)

```
task-management/
├── backend/            # Express + TypeScript, Clean Architecture, Inversify DI
├── frontend/            # React + TypeScript + Vite + Tailwind
├── docker-compose.yml   # mongo + backend + frontend, one command
└── README.md
```
