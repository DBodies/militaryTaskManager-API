# Military Task Manager API

REST API for authentication and personal task management. Users can register, log in, create and manage their own tasks, filter and sort task lists, and archive tasks. Administrator-only access is available for viewing tasks belonging to all users.

## Features

- User registration and login
- Password hashing with bcrypt
- JWT authentication
- Role-based authorization (`user`, `admin`)
- Task ownership: users can access only their own tasks
- Task CRUD operations
- Task archiving
- Pagination, filtering, sorting, and text search
- Joi request validation with custom authentication messages
- CORS configuration through environment variables
- Security headers with Helmet
- Rate limiting for authentication routes
- Interactive OpenAPI documentation with Swagger UI

## Technologies

- Node.js
- Express 5
- MongoDB Atlas
- Mongoose
- Joi
- JSON Web Token
- bcrypt
- Swagger / OpenAPI
- Helmet
- express-rate-limit
- CORS

## Project structure

```text
src/
├── config/          # Database connection
├── constants/       # Shared constants
├── controllers/     # HTTP request and response handling
├── docs/            # OpenAPI specification
├── middlewares/     # Authentication, validation, errors, roles
├── models/          # Mongoose models
├── routes/          # Express routes
├── schemas/         # Joi validation schemas
├── service/         # Business logic and database operations
├── utils/           # Pagination, filters, sorting, CORS, env helpers
├── index.js         # Application entry point
└── server.js        # Express application setup
```

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd militaryTaskManager-API

# Install dependencies
npm install

# Create the local environment file
cp .env.example .env
```

On Windows PowerShell, create the environment file with:

```powershell
Copy-Item .env.example .env
```

Fill in the values inside `.env`, then start the application:

```bash
npm run dev
```

Production-style start:

```bash
npm start
```

The default local URL is:

```text
http://localhost:5000
```

## Environment variables

| Variable | Description | Example |
|---|---|---|
| `PORT` | HTTP server port | `5000` |
| `NAME_DB` | MongoDB Atlas database username | — |
| `PASSWORD_DB` | MongoDB Atlas database password | — |
| `URL_DB` | MongoDB Atlas cluster host without protocol | `cluster0.example.mongodb.net` |
| `FOLDER_DB` | Database name | `military_tasks` |
| `JWT_SECRET` | Secret used to sign and verify JWT tokens | — |
| `JWT_EXPIRES_IN` | Access-token lifetime accepted by `jsonwebtoken` | `15m` |
| `ALLOWED_ORIGIN` | Browser origin allowed by CORS | `http://localhost:3000` |

## Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the server with Nodemon |
| `npm start` | Start the server with Node.js |
| `npm test` | Tests are not configured yet |

## API documentation

After starting the server, open Swagger UI:

```text
http://localhost:5000/api-docs
```

Authentication workflow in Swagger UI:

1. Register through `POST /api/auth/register`.
2. Log in through `POST /api/auth/login`.
3. Copy `data.accessToken` from the response.
4. Click **Authorize**.
5. Enter the token. Swagger UI applies the `Bearer` authorization scheme automatically.
6. Execute protected task and user requests.

## Main endpoints

### Authentication

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a user | Public |
| `POST` | `/api/auth/login` | Log in and receive an access token | Public |

Authentication endpoints are rate-limited to 250 requests per 10 minutes per client.

### Users

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/users/me` | Get the current user | Authenticated |
| `GET` | `/api/users/admin/tasks` | Get tasks from all users | Admin only |

### Tasks

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/tasks` | Get the current user's tasks | Authenticated |
| `POST` | `/api/tasks` | Create a task owned by the current user | Authenticated |
| `GET` | `/api/tasks/:taskId` | Get one owned task | Authenticated |
| `PATCH` | `/api/tasks/:taskId` | Update one owned task | Authenticated |
| `PATCH` | `/api/tasks/:taskId/archive` | Archive one owned task | Authenticated |
| `DELETE` | `/api/tasks/:taskId` | Delete one owned task | Authenticated |

## Task list query parameters

`GET /api/tasks` and the admin task-list endpoint support:

| Parameter | Purpose |
|---|---|
| `page` | Page number, default `1` |
| `perPage` | Items per page, default `10` |
| `sortBy` | `createdAt`, `updatedAt`, `dueDate`, `status`, or `priority` |
| `sortOrder` | `asc` or `desc` |
| `search` | Search in title and description |
| `title` | Partial title filter |
| `description` | Partial description filter |
| `status` | Filter by task status |
| `priority` | Filter by priority |
| `category` | Filter by category |
| `isArchived` | Filter by archive state |

Example:

```text
GET /api/tasks?page=1&perPage=10&status=pending&priority=high&sortBy=dueDate&sortOrder=asc&search=equipment
```

## Authentication

Protected endpoints require the following HTTP header:

```http
Authorization: Bearer <access-token>
```

The access token is returned by `POST /api/auth/login` and contains the user id and role. The server verifies the token and loads the current user from MongoDB before allowing access.

## Roles and permissions

- Newly registered accounts receive the `user` role.
- A regular user can access only tasks where `owner` matches the authenticated user's id.
- The task owner is assigned by the backend and cannot be supplied through request bodies.
- The `admin` role is required for `GET /api/users/admin/tasks`.
- The current API does not expose an endpoint for promoting a user to admin; the role must be managed through trusted administrative database access.

When an authenticated user requests another user's task id, the API returns `404` instead of confirming that the resource exists.

## Request examples

### Register

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Denis",
  "email": "denis@example.com",
  "password": "StrongPassword123"
}
```

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "denis@example.com",
  "password": "StrongPassword123"
}
```

### Create a task

```http
POST /api/tasks
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "title": "Inspect equipment",
  "description": "Inspect all assigned equipment before training.",
  "priority": "high",
  "category": "maintenance",
  "dueDate": "2026-08-05T09:00:00.000Z"
}
```

## Response format

Most successful responses use:

```json
{
  "message": "Success",
  "data": {}
}
```

List responses additionally include pagination:

```json
{
  "message": "Success",
  "data": [],
  "pagination": {
    "page": 1,
    "perPage": 10,
    "totalItems": 0,
    "hasNextPage": false,
    "hasPreviousPage": false,
    "totalPages": 0
  }
}
```

Validation errors use:

```json
{
  "status": 400,
  "message": "Bad Request",
  "errors": [
    "Email must be a valid email address"
  ]
}
```

Other handled errors generally use:

```json
{
  "status": 401,
  "message": "Invalid or expired token"
}
```

## HTTP status codes

| Status | Meaning in this API |
|---:|---|
| `200` | Successful read or update |
| `201` | Resource created |
| `204` | Task deleted; no response body |
| `400` | Validation error or invalid task id |
| `401` | Missing, invalid, expired token, or invalid login credentials |
| `403` | Authenticated user lacks the required role |
| `404` | Route/task not found or task is not owned by the current user |
| `409` | Email is already registered |
| `429` | Authentication rate limit exceeded |
| `500` | Unexpected server error |

## Security notes

- Passwords are hashed with bcrypt before storage.
- Password fields are removed from serialized user responses.
- Client-provided roles and task owners are rejected by Joi validation.
- JWT secrets and database credentials belong only in `.env`.
- Helmet adds common security headers.
- CORS allows the configured browser origin and requests without an `Origin` header, such as server-to-server clients.
