# Task Manager Application - Project Flow

## 1. Overview
The Task Manager Application is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application designed to help users organize and manage their daily tasks. It features secure user authentication, complete CRUD (Create, Read, Update, Delete) functionality for tasks, and AI-powered task suggestions.

## 2. Architecture Stack
- **Frontend**: React.js (built with Vite)
- **Backend**: Node.js with Express.js framework
- **Database**: MongoDB (using Mongoose ORM for data modeling)
- **AI Integration**: OpenAI API for generating task suggestions

---

## 3. Application Flow

### A. User Authentication Flow
1. **Client Interface**: The user enters their credentials (name, email, password) on the React frontend (Registration or Login page).
2. **API Request**: The frontend sends an asynchronous HTTP POST request to `/api/users/` (for registration) or `/api/users/login`.
3. **Backend Processing**: 
   - Express router (`userRoutes.js`) directs the request to the `userController.js`.
   - Passwords are encrypted/verified. The user is created or authenticated against the MongoDB database.
   - A JSON Web Token (JWT) is generated for the authenticated user.
4. **Server Response**: The backend responds with the user profile data and the JWT.
5. **State Management**: The frontend stores the token and user state, authorizing access to protected routes (like the main dashboard).

### B. Task Management Flow (Protected Operations)
1. **User Action**: The user creates, edits, views, or deletes a task on the frontend dashboard.
2. **Authorized Request**: The frontend sends an HTTP request (GET, POST, PUT, DELETE) to `/api/tasks`. It includes the user's JWT in the `Authorization: Bearer <token>` header.
3. **Authentication Middleware**: 
   - The backend intercepts the request using `authMiddleware.js`.
   - It decodes and verifies the JWT.
   - It fetches the user from the database and attaches the user ID to the request object (`req.user`), ensuring users can only access their own tasks.
4. **Database Operations**: The request is routed to `taskController.js`, which performs the requested MongoDB operations using the `Task` model.
5. **UI Update**: The backend returns the updated task data, and the React frontend updates the user interface accordingly.

### C. AI Task Suggestion Flow
1. **User Request**: The user interacts with the AI suggestion feature on the frontend.
2. **API Call**: The frontend sends a request to the designated AI route.
3. **OpenAI Communication**: The `aiController.js` formats the user's context and sends a prompt to the OpenAI API.
4. **Data Delivery**: The AI response is parsed into actionable task items and sent back to the frontend to be displayed and potentially added to the database.

---

## 4. Error Handling Flow
- **Centralized Middleware**: Any errors that occur during backend processing (e.g., bad requests, database errors, missing fields) are passed to the `errorHandler` inside `errorMiddleware.js`.
- **Standardized Response**: This middleware ensures the frontend receives a consistent JSON error format containing the error message (and a stack trace if the server is in development mode), which is then displayed elegantly on the UI.
